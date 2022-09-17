import express from 'express';
import { addOrganization } from './services/add-organization';
import { deleteOrganizationServiceFunc } from './services/delete-organization';
import { findOrganizationByIdServiceFunc } from './services/find-organization-by-id';
import { getOrganizationList } from './services/get-organization-list';
import { updateOrganizationService } from './services/update-organization';

const getOrganizations = async (
  req: express.Request,
  res: express.Response
) => {
  const admin = (req as any).user;
  try {
    const organizationList = await getOrganizationList(admin, req.query as any);
    res.json(organizationList);
  } catch (error: any) {
    console.log(error.message);
    res.status(error.code ? error.code : 500).json(error.message);
  }
};

// ! motive -> find users connected to a certain lab
// we dont have lab . But authtoken of user logged in
// hence , we can get user -> org id
// find all users which have that org id

const createOrganization = async (
  req: express.Request,
  res: express.Response
) => {
  const user = (req as any).user;
  try {
    const createdOrganization = await addOrganization(user, req.body, user._id);
    console.log(createdOrganization, 'Organization created Successfully');
    res.json('Organization created Successfully');
  } catch (error: any) {
    console.log(error.message);
    res.status(error.code ? error.code : 500).json(error.message);
  }
};

const getOrganizationById = async (
  req: express.Request,
  res: express.Response
) => {
  const { id } = req.params;
  console.log(id);
  try {
    const Organization = await findOrganizationByIdServiceFunc(id);
    res.json(Organization);
  } catch (error: any) {
    res.status(error.code).end(error.message);
  }
};

const deleteOrganization = async (
  req: express.Request,
  res: express.Response
) => {
  const { id } = req.params;
  try {
    const updatedOrganization = await deleteOrganizationServiceFunc(id);
    console.log(updatedOrganization);
    res.end('Organization Deleted Successfully!');
  } catch (error: any) {
    res.status(error.code).end(error.message);
  }
};

const updateOrganization = async (
  req: express.Request,
  res: express.Response
) => {
  const admin = (req as any).user;
  const organization = req.params.id;
  console.log(req.params, 'req params');
  console.log('request arrived for updating organization');
  try {
    const updatedOrganization = await updateOrganizationService(
      organization,
      admin,
      req.body
    );

    console.log(updatedOrganization, 'updatedOrganization');
  } catch (error: any) {
    console.log(error.message);
  }
};

export {
  getOrganizations,
  createOrganization,
  getOrganizationById,
  deleteOrganization,
  updateOrganization,
};
