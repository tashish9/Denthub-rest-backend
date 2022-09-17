import mongoose from 'mongoose';
import { User } from '../../model/user';
import { Users } from '../models';

const findUser = (condition = {}, selection = {}) => {
  return Users.findOne(condition, selection).populate({
    path: 'organization',
  });
};

const findusers = (condition = {}, selection = {}) => {
  return Users.find(condition, selection).populate([
    {
      path: 'organization',
    },
  ]) as unknown as User[];
};

const findUserById = (id: string, selection = {}) => {
  return Users.findById(id, selection);
};

const findOneAndUpdateUser = (filter = {}, update = {}) => {
  return Users.findOneAndUpdate(
    filter,
    {
      $set: update,
    },
    {
      returnDocument: 'after',
    }
  ).populate({
    path: 'organization',
    select: '-password',
  });
};

const createUser = (userData: Object) => {
  return Users.create({
    ...userData,
  });
};
export { findUser, findusers, findUserById, createUser, findOneAndUpdateUser };
