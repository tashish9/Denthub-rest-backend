import mongoose from 'mongoose';
import {
  findOneAndUpdateOrganization,
  findOrganization,
} from '../../../db/controllers/organizations';
import { throwBadRequestError } from '../../../error';
import { User } from '../../../model';

const updateOrganizationService = async (
  organization: string,
  admin: User,
  updateInfo: any
) => {
  // ! who update what && validations
  if (
    admin.type === 'TECHNICIAN' ||
    admin.role === 'DENTIST_USER' ||
    (admin.role === 'DEMTIST_ADMIN' && updateInfo.type !== 'Clinic')
  ) {
    throwBadRequestError('Access Denied');
  }

  // ! data transformation

  const updateOrgInfo = {
    ...updateInfo,
    contact: {
      email: updateInfo.email,
      website: updateInfo.website,
      phoneNumber: updateInfo.phoneNumber,
    },
    address: {
      street: updateInfo.street,
      city: updateInfo.city,
      postal_code: updateInfo.postalCode,
      country: updateInfo.country,
    },
    parentClinic: new mongoose.Types.ObjectId(updateInfo.parentClinic),
    updated: {
      at: new Date(),
      by: admin._id,
    },
    active: true,
  };

  console.log(updateOrgInfo, 'updateOrgInfo');

  const updatedOrganization = await findOneAndUpdateOrganization(
    { _id: organization },
    updateOrgInfo
  );
  if (updatedOrganization === null) {
    throwBadRequestError('Bad request');
  }
  return updatedOrganization;
};

export { updateOrganizationService };
