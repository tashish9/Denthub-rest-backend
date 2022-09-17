import mongoose from 'mongoose';
import {
  createOrganizationDB,
  findOrganization,
} from '../../../db/controllers/organizations';
import { throwBadRequestError } from '../../../error';
import { Organization, User } from '../../../model';

const addOrganization = async (
  admin: User,
  updateInfo: any,
  adminId: mongoose.Types.ObjectId
): Promise<Organization> => {
  const org = await findOrganization({ 'contact.email': updateInfo.email });
  console.log(org);
  if (org) {
    throwBadRequestError('Org already exist', false);
  }
  
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
    parentClinic: updateInfo.parentClinic
      ? new mongoose.Types.ObjectId(updateInfo.parentClinic)
      : null,
    created: {
      at: new Date(),
      by: admin._id,
    },
    active: true,
  };
  return createOrganizationDB(updateOrgInfo as unknown as Organization);
};

export { addOrganization };
