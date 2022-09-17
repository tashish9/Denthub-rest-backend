import mongoose from 'mongoose';

type Organization = {
  // properties of the type
  _id: mongoose.Types.ObjectId;
  name: string;
  contact: {
    email: string;
    phoneNumber: string;
    website: string;
  };
  address: {
    street: string;
    city: string;
    postal_code: string;
    country: string;
  };
  OrganizationNumber: string;
  parentClinic: mongoose.Schema.Types.ObjectId;
  active: boolean;
  type: string;
  created: {
    at: Date;
    by: mongoose.Schema.Types.ObjectId;
  };
  updated: {
    at: Date;
    by: mongoose.Schema.Types.ObjectId;
  };
  logoImage: string;
  connectedLabs: mongoose.Schema.Types.ObjectId[];
};

export { Organization };
/*

You can also add return type annotations. Return type annotations appear after the parameter list:

function getFavoriteNumber(): number {
  return 26;
}
*/
