import mongoose from 'mongoose';
const OrganizationSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  contact: {
    email: {
      type: String,
    },
    phoneNumber: {
      type: String,
    },
    website: {
      type: String,
    },
  },
  address: {
    street: {
      type: String,
    },
    city: {
      type: String,
    },
    postal_code: {
      type: String,
    },
    country: {
      type: String,
    },
  },
  OrganizationNumber: {
    type: String,
  },
  parentClinic: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Organizations',
  },
  active: {
    type: Boolean,
  },
  type: {
    type: String,
    enum: ['Clinic', 'Lab'],
  },
  created: {
    at: {
      type: Date,
    },
    by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Users',
    }, //ref to User
  },
  updated: {
    at: {
      type: Date,
    },
    by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Users',
    }, //ref to User
  },
  logoImage: {
    type: String,
  },

  connectedLabs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Organizations',
    },
  ],
});

const Organizations = mongoose.model('Organizations', OrganizationSchema);
export { Organizations };
