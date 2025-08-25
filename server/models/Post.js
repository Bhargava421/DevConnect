const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  image: {
    // By not setting "required: true" on this outer object,
    // the entire 'image' field becomes optional.
    type: {
      url: String,
      public_id: String,
    },
    required: false
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
},
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Post', PostSchema);