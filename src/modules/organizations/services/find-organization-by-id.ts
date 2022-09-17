import { findOrganizationById } from '../../../db/controllers/organizations';
import { throwNotFoundError } from '../../../error';
import { Organization } from '../../../model';

const findOrganizationByIdServiceFunc = async (
  id: string
): Promise<Organization> => {
  const organization = await findOrganizationById(id);
  if (!organization) {
    throwNotFoundError('Organisation does not exist');
  }
  return organization;
};

export { findOrganizationByIdServiceFunc };
