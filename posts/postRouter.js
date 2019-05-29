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
    // try {
    //     const count = await Posts.remove(req.params.id);
    //     if (count > 0) {
    //       res.status(200).json({ posts, message: 'The post has been nuked' });
    //     } else {
    //       res.status(404).json({ posts, message: 'The post could not be found' });
    //     }
    //   } catch (error) {
    //     // log error to server
    //     console.log(error);
    //     res.status(500).json({
    //       message: 'Error removing the hub',
    //     });
    //   }
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