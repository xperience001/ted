const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    required: true
},
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true
  },
  productImageUrl: {
    type: String,
    required: true
  },
//   likes: {
//     type: Number,
//     default: 0,
//   }

},
{
  timestamps: true,
});

module.exports = mongoose.model('Product', productSchema);