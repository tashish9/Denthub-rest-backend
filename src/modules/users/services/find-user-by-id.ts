import { findUserById } from '../../../db/controllers/users';
import { throwNotFoundError } from '../../../error';
import { User } from '../../../model/user';

const findUserByIdServiceFunc = async (id: string): Promise<User> => {
  const user = await findUserById(id);
  if (!user) {
    throwNotFoundError("User doesn't exist");
  }
  return user;
};

export { findUserByIdServiceFunc };
