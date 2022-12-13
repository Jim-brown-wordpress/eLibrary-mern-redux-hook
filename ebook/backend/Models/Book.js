const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let BookSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  comments:[{
    email: {
      type: String,
      required: true
    },
    comment: {
      type: String,
      required: true
    }
  }]
})

module.exports = mongoose.model('Book', BookSchema)
