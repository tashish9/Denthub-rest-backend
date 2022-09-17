import mongoose from 'mongoose';
const userSchema = new mongoose.Schema({
  username: {
    type: String,
  },
  type: {
    type: String,
    enum: ['DENTIST', 'TECHNICIAN'],
  }, // gotta add enum
  role: {
    type: String, // gotta add enum
    enum: [
      // constants
      'DENTIST_ADMIN',
      'DENTIST_USER',
      'TECHNICIAN_ADMIN',
      'TECHNICIAN_USER',
    ],
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  organization: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Organizations',
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
  active: {
    type: Boolean,
  },
  profileImage: {
    type: String,
  }, // link basically
  phoneNumber: {
    type: String,
  }, // convert to num later // use num only when gotta go for direct calcs
});

// const Users = mongoose.model('Users', userSchema);
// export { Users };
export const Users = mongoose.model('Users', userSchema); // obj
