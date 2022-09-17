import mongoose from 'mongoose';
import { findOneAndUpdateUser } from '../../../db/controllers/users';
import { throwNotFoundError } from '../../../error';

const deleteUserService = async (userId: string, adminId: string) => {
  const user = await findOneAndUpdateUser({ _id: userId }, { active: false });
  if (!user) {
    throwNotFoundError('User does not exist');
  }
  return user;
};

export { deleteUserService };
