const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create schema

const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },

  company: {
    type: String,
  },
  website: {
    type: String
  },
  location: {
    type: String
  },
  status: {
    type: String,
    // required:true
  },
  skills: {
    type: [String],

  },
  bio: {
    type: String
  },
  
  social: {
    youtube: {
      type: String
    },
    twitter: {
      type: String
    },
    facebook: {
      type: String
    },
    linkedin: {
      type: String
    },
    instagram: {
      type: String
    }
  },
  date: {
    type: Date,
    default: Date.now
  }

})
module.exports = Profile = mongoose.model('profile', ProfileSchema)