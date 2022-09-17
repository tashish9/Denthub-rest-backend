import mongoose from 'mongoose';
import { Organization } from '../../model';
import { Organizations } from '../models';

const findOrganization = (condition = {}, selection = {}) => {
  console.log(condition);
  return Organizations.findOne(condition, selection);
};

const createOrganizationDB = (organizationData: Organization) => {
  return Organizations.create(organizationData);
};

const findOrganizations = (condition = {}, selection = {}) => {
  return Organizations.find(condition, selection).populate([
    {
      path: 'created.by',
      select: '-password',
    },
    {
      path: 'parentClinic',
      select: '-password',
    },
  ]) as unknown as Organization[];
};

const findOrganizationById = (id: string, selection = {}) => {
  return Organizations.findById(id, selection);
};

const findOneAndUpdateOrganization = (filter = {}, update = {}) => {
  return Organizations.findOneAndUpdate(
    filter,
    { $set: update },
    {
      returnDocument: 'after',
    }
  );
};

export {
  findOrganization,
  createOrganizationDB,
  findOrganizations,
  findOrganizationById,
  findOneAndUpdateOrganization,
};
