import mongoose from 'mongoose';
import { Organization } from './organization';

type User = {
  _id: mongoose.Types.ObjectId;
  username: string;
  knownFor: string[];
  type: string;
  role: string;
  email: string;
  password: string;
  organization: mongoose.Schema.Types.ObjectId | Organization;
  created: {
    at: Date;
    by: mongoose.Schema.Types.ObjectId | User;
  };
  updated: {
    at: Date;
    by: mongoose.Schema.Types.ObjectId | User;
  };
  active: boolean;
  profileImage: string;
  phoneNumber: string;
};

export { User };
/*

You can also add return type annotations. Return type annotations appear after the parameter list:

function getFavoriteNumber(): number {
  return 26;
}
*/
