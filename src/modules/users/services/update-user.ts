import mongoose from 'mongoose';
import {
  findOneAndUpdateUser,
  findUser,
  findUserById,
} from '../../../db/controllers/users';
import { throwNotFoundError } from '../../../error';
import { User } from '../../../model/user';

const updateUserService = async (_id: string, updateInfo: any, admin: User) => {
  const adminID = admin._id.toString();
  if (updateInfo.organization) {
    updateInfo.organization = new mongoose.Types.ObjectId(
      updateInfo.organization
    );
  }
  const updateUserInfo = {
    ...updateInfo,
    updated: {
      at: new Date(),
      by: admin._id,
    },
  };
  console.log(updateUserInfo, 'updateUserInfo');
  const user = await findOneAndUpdateUser({ _id }, updateUserInfo);
  if (!user) {
    throwNotFoundError('User does not exist');
  }
  return user;
};

export { updateUserService };
