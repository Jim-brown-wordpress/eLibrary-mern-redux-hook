let mongoose = require('mongoose'),
  express = require('express'),
  router = express.Router()


const bcrypt = require('bcryptjs');

// Student Model
let User = require('../models/User');


// CREATE Student
router.route('/allOthers').get((req , res , next) => {
  User.find({roll: 'normal'} , (err , others) => {
      if(err) throw err;
      res.status(200).json({others})
  });
});
router.route('/register').post((req , res , next) => {
    User.findOne({email: req.body.email} , (err , docs) => {
      if(err) throw err;
      if(docs){
        return res.status(400).json({email: 'Email already exists'});
      }

      let userInfo = {...req.body};
      bcrypt.genSalt(10 , (err , salt) => {
        if(err) throw err;
        bcrypt.hash(userInfo.password , salt , (err , hash) => {
          if (err) throw err;
          userInfo.password = hash;
          User.create(userInfo, (error, data) => {
              if (error) {
                return next(error)
              } else {
                console.log(data)
                res.json(data)
              }
            })
        })
      })
    })
});
router.route('/signin').post((req , res , next) => {
    User.findOne({email: req.body.email} , (err , data) => {
        if(err) throw err;
        if(!data){
            return res.status(404).json({email: "Email not found"});
        }
        bcrypt.compare(req.body.password , data.password , (err , isMatch) => {
          if(err) throw err;
          if(!isMatch){
            return res.status(400).json({password: 'Password is not match'});
          }
          console.log(data);
          return res.status(200).json({user:data});
        })
    });
});

router.route('/edit-profile').put((req , res , next) => {
    User.findOneAndUpdate({email: req.body.email} , {$set: req.body} , (err , data) => {
        if(err) throw err;
        return res.status(200).json(data);
    });
});


// Update User
router.route('/update-user/:id').put((req, res, next) => {
  User.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    (error, data) => {
      if (error) {
        return next(error)
        console.log(error)
      } else {
        res.json(data)
      }
    },
  )
})

// Delete User
router.route('/delete-user/:id').delete((req, res, next) => {
  User.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.status(200).json({
        msg: data,
      })
    }
  })
})

router.route('/add-fav').post((req, res, next) => {
  console.log(req.body)
  User.updateOne(
    {email:req.body.email},
    {$push: {favourites: req.body.id}},
    (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.status(200).json({
        msg: data,
      })
    }
  })
})

router.route('/delete-fav').post((req, res, next) => {
  console.log(req.body)
  User.updateOne(
    {email:req.body.email},
    {$pull: {favourites: req.body.id}},
    (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.status(200).json({
        msg: data,
      })
    }
  })
})

module.exports = router
