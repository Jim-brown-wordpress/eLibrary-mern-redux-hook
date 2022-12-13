let mongoose = require('mongoose'),
  express = require('express'),
  router = express.Router()

// Book Model
let Book = require('../models/Book');

// CREATE Book
router.route('/create-book').post((req, res, next) => {
  Book.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// READ Books
router.route('/').get((req, res) => {
  Book.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Get Single Book
router.route('/edit-book/:id').get((req, res) => {
  Book.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Update Book
router.route('/update-book/:id').put((req, res, next) => {
  Book.findByIdAndUpdate(
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
        console.log('Book updated successfully !')
      }
    },
  )
})

// Delete Book
router.route('/delete-book/:id').delete((req, res, next) => {
  Book.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.status(200).json({
        msg: data,
      })
    }
  })
})


router.route('/add-comment').post((req, res, next) => {
  console.log(req.body)
  Book.updateOne(
    {_id:req.body.id},
    {$push: {comments: {email:req.body.email , comment: req.body.comment}}},
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
