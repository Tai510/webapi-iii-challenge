const express = require('express');
const Posts = require('./postDb.js')

const router = express.Router();

router.post('/', /* validatePostId, */ async (req, res) => {
    // try {
    //   const posts = await Posts.insert(req.body);
    //   res.status(201).json(posts);
    // } catch (error) {
    //   // log error to server
    //   console.log(error);
    //   res.status(500).json({
    //     message: 'Error adding the posts',
    //   });
    // }
  });

router.get('/', async (req, res) => {
    try {
        const posts = await Posts.get(req.query);
        res.status(200).json(posts);
      } catch (error) {
        // log error to server
        console.log(error);
        res.status(500).json({
          message: 'Error retrieving the posts',
        });
      }
});

router.get('/:id', (req, res) => {

});


router.delete('/:id', (req, res) => {
    const {id} = req.params;
    Posts.remove(id)
    .then(id => {
        if(id) {
            res.json('user has been removed')
        } else {
            res.status(404).json('invalid ID')
        }
    })
    .catch(err => {
        res.status(500).json('I could not delete that user')
    })
});

router.put('/:id', (req, res) => {

});

// custom middleware

function validatePostId(req, res, next) {
    if(req.body && req.body.id) {
        next() 
      } else {
        res.status(400).json({ message: 'error finding ID'})
      }
};

module.exports = router;