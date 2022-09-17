import express from 'express'; // -? import {Router} from 'express' ; // just for type at line 7
import {
  initialiseOrdersRoutes,
  initialiseOrganizationsRoutes,
  initialiseUsersRoutes,
} from './modules';

const initialiseRouters = (router: express.Router) => {
  initialiseOrdersRoutes(router);
  initialiseOrganizationsRoutes(router);
  initialiseUsersRoutes(router);
};
export { initialiseRouters };
