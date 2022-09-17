import { findOrganizations } from '../../../db/controllers/organizations';
import { throwBadRequestError } from '../../../error';
import { Organization, User } from '../../../model';

const getOrganizationList = async (admin: User, searchParams: any) => {
  console.log('request arrived for org list');
  if (admin.role === 'SUPER_ADMIN') {
    const type = searchParams.type;
    if (!type) {
      throwBadRequestError('Bad Request');
    }

    return findOrganizations({ type }, { password: 0 });
  } else if (admin.type === 'DENTIST') {
    const adminOrganizationId = (admin.organization as Organization)._id;
    console.log(adminOrganizationId);
    const childClinics = await findOrganizations({
      parentClinic: adminOrganizationId,
    });

    console.log(childClinics.length);

    const parentChildClinics = [admin.organization, ...childClinics];
    console.log(parentChildClinics);

    return parentChildClinics;
  } else {
    return [admin.organization];
  }
};

export { getOrganizationList };
