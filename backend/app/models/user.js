const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  firstname: {
    type: String,
    minlength: 2,
    // match: /^([a-zA-Z]{2,}\s[a-zA-z]{1,}'?-?[a-zA-Z]{2,}\s?([a-zA-Z]{1,})?)/,
    required: true,
  },
  lastname: {
    type: String,
    minlength: 2,
    // match: /^([a-zA-Z]{2,}\s[a-zA-z]{1,}'?-?[a-zA-Z]{2,}\s?([a-zA-Z]{1,})?)/,
    required: true,
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    minlength: 7,
    required: true
  },
  phone: {
    type: Number,
    minlength: 7,
    required: true
  },
  clientType: {
    type: String,
    required: true
  }
},
{
  timestamps: true,
});

module.exports = mongoose.model('User', userSchema);