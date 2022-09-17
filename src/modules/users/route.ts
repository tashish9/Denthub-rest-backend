import { Router } from 'express';
import { authenticateUserWithToken } from '../../middlewares';
import {
  signUp,
  signIn,
  getCurrentUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} from './controllers';

export const initialiseUsersRoutes = (router: Router) => {
  router.post('/signup', authenticateUserWithToken, signUp);
  router.post('/signin', signIn);
  router.get('/users/:id', authenticateUserWithToken, getUserById);
  router.get('/current-user', authenticateUserWithToken, getCurrentUser);
  router.get('/users', authenticateUserWithToken, getUsers);
  router.put('/users/:id', authenticateUserWithToken, updateUser);
  router.delete('/users/:id', authenticateUserWithToken, deleteUser);
};

//  -> add app error // done
//  -> logging // done
// devide controllers to services/action functions
// shouldn't pass req , res to these funcs (for the sake of memory optimization )
// create service folder and throw all funcs in there
// more files -> but easy to manage
// different folder for db related funcs
// better considering future possibilities
// can access that easily and change later if we want
// other code is independent of whats happening in db
//  -> Create services // Done
// type of func -> what it returns
// aggregate -> each array is a pipeline
