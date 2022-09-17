import express, { json } from 'express';
import { addUser } from './services/add-user';
import { login } from './services/login';
import { findUserByIdServiceFunc } from './services/find-user-by-id';
import { getUsersList } from './services/get-users-list';
import { updateUserService } from './services/update-user';
import { deleteUserService } from './services/delete-user';
import { throwBadRequestError } from '../../error';

// get data  from req
// passing data to service func
// send back the res

// frontend -> presence of token in disk

const signUp = async (req: express.Request, res: express.Response) => {
  console.log('request arrived for adding a user');
  const admin = (req as any).user;
  const user = req.body;
  try {
    const createdUser = await addUser(user, admin);
    console.log(createdUser, 'createdUser');
    res.json(createdUser);
  } catch (error: any) {
    console.log(error);
    res.status(error.code ? error.code : 500).json(error.message);
  }
};

const signIn = async (req: express.Request, res: express.Response) => {
  const user = req.body;
  try {
    const loggedInUserData = await login(user);
    res.end(JSON.stringify(loggedInUserData));
  } catch (error: any) {
    res.status(error.code).end(error.message);
  }
};

const getUserById = async (req: express.Request, res: express.Response) => {
  const { id } = req.params; // route
  try {
    const user = await findUserByIdServiceFunc(id);
    res.json(user);
  } catch (error: any) {
    res.status(error.code).end(error.message);
  }
};

const getCurrentUser = (req: express.Request, res: express.Response) => {
  const user = (req as any).user;
  res.json(user);
};

const updateUser = async (req: express.Request, res: express.Response) => {
  const admin = (req as any).user;
  const id = req.params.id;
  const updateInfo = req.body;
  try {
    const updatedUser = await updateUserService(id, updateInfo, admin);
    console.log(updatedUser);
    res.json(updatedUser);
  } catch (error: any) {
    console.log(error.message);
    res.status(error.code).end(error.message);
  }
};

const getUsers = async (req: express.Request, res: express.Response) => {
  console.log('request arrived for getting users list');
  //  What are the detailed functionalities of this func

  //? 1 . Return All dentists
  // ** Search params -> type : Dentist(uppercase)
  //? 2 . Return All Technicians
  // ** Search params -> type : Technician(uppercase)

  //? 3. All users belonging to a particular org(clinic/lab)
  // ** no search params -> organization : admin.organization
  // ** but the very first user should be the loggedIn User

  // ! check role & then accordingly return data

  const admin = (req as any).user;
  try {
    const userslist = await getUsersList(admin, req.query as any);
    res.json(userslist);
  } catch (error: any) {
    console.log(error.message);
    res.status(error.code ? error.code : 500).json(error.message);
  }
};

const deleteUser = async (req: express.Request, res: express.Response) => {
  const adminId = (req as any).user_id;
  const { id: userId } = req.params;
  console.log(userId, 'userID');
  try {
    const updatedUser = await deleteUserService(userId, adminId);
    console.log(updatedUser);
    res.end('User Deleted Successfully!');
  } catch (error: any) {
    res.status(error.code).end(error.message);
  }
};

export {
  signUp,
  signIn,
  getCurrentUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
};
