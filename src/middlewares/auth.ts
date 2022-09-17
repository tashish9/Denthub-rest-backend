import { sign, verify } from 'jsonwebtoken';
import express from 'express';
import { CONSTANTS } from '../config';
import { Users } from '../db/models';
import { throwBadRequestError } from '../error';
import { JwtPayload } from 'jsonwebtoken';
import { findUser } from '../db/controllers/users';
const { SECRET } = CONSTANTS;

// 1. Create token
// 2. Authorise the token on each request

const createToken = (payload: JwtPayload) => {
  const tokenPayload = Object.assign({ time: new Date().getTime() }, payload);
  return sign(tokenPayload, SECRET!, { expiresIn: '7 days' }); // returning a legit jwt token
};

const authenticateUserWithToken = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const auth = req.headers.authorization;
  try {
    if (!auth) {
      throwBadRequestError('Token Error');
    }
    const authParts = (auth as string).split(' ');
    if (authParts.length !== 2) {
      throwBadRequestError('Token Error');
    }
    const [scheme, token] = authParts;
    if (scheme !== 'JWT') {
      throwBadRequestError('Token Error');
    }
    let user = verify(token, SECRET!);
    const id = (user as any).id;
    (user as string | JwtPayload | null) = await findUser({ _id: id });
    if (!user) {
      throwBadRequestError('User does not exist');
    }
    (req as any).user = user;
    console.log(
      `authentication successful -> ${(user as any).username} (${
        (user as any).role
      })`
    );
    next();
  } catch (error: any) {
    // if (error.message === 'jwt malformed') {
    //   error.message = 'Token Error';
    //   error.code = 400;
    // }
    console.log(error.message);
    res.status(error.code || 402).json(error.message);
  }
};
export { createToken, authenticateUserWithToken };
