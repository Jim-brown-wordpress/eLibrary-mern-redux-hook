const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

let UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  roll: {
    type: String,
    default: 'normal'
  },
  favourites: {
    type: Array,
    default: []
  }
});

let User = mongoose.model('User', UserSchema);

bcrypt.genSalt(10 , (err , salt) => {
  if(err) throw err;
  User.findOne({email: 'admin@gmail.com'} , (err , docs) => {
    if(err) throw err
    if(!docs){

        bcrypt.hash('admin' , salt , (err , hash) => {
          if(err) throw err;
          const adminUser = new User({
            name: 'admin',
            email: 'admin@gmail.com',
            password: hash,
            roll: 'admin'
          });
          adminUser.save();
        })

    }
  })
})


module.exports = User;
