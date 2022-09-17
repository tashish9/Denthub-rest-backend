import {
  findOneAndUpdateOrganization,
  findOrganizationById,
} from '../../../db/controllers/organizations';
import { throwNotFoundError } from '../../../error';
import { Organization } from '../../../model';

const deleteOrganizationServiceFunc = async (
  id: string
): Promise<Organization> => {
  const organization = await findOneAndUpdateOrganization(
    { id },
    { active: false }
  );
  if (!organization) {
    throwNotFoundError('Organization does not exist');
  }
  return organization;
};

export { deleteOrganizationServiceFunc };
