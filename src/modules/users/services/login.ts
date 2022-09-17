import { findUser } from '../../../db/controllers/users';
import bcrypt from 'bcrypt';
import { createToken } from '../../../middlewares';
import { User } from '../../../model';
import { throwBadRequestError, throwNotFoundError } from '../../../error';

const login = async (userFromRequest: User) => {
  const { email, password } = userFromRequest;
  const user = await findUser({ email: email });
  if (!user) {
    throwBadRequestError('Incorrect username/password');
  }
  if (!bcrypt.compare(password, user.password)) {
    throwBadRequestError('Incorrect username/password');
  }
  const token = createToken({ id: user._id, username: user.name });
  const loggedInUserData = {
    _id: user._id,
    username: user.username,
    role: user.role,
    authToken: token,
  };
  return loggedInUserData;
};

export { login };
