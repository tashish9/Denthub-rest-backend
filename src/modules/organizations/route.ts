import { Router } from 'express';
import {
  deleteOrganization,
  getOrganizationById,
  getOrganizations,
  updateOrganization,
} from './controllers';
import { authenticateUserWithToken } from '../../middlewares';
import { createOrganization } from './controllers';

export const initialiseOrganizationsRoutes = (router: Router) => {
  router.get('/organizations', authenticateUserWithToken, getOrganizations);
  router.post('/organizations', authenticateUserWithToken, createOrganization);
  router.get(
    '/organizations/:id',
    authenticateUserWithToken,
    getOrganizationById
  );
  router.delete(
    '/organizations/:id',
    authenticateUserWithToken,
    deleteOrganization
  );
  router.put(
    '/organizations/:id',
    authenticateUserWithToken,
    updateOrganization
  );
};
