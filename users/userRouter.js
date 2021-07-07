const express = require('express');
const Users = require('./userDb.js')
const db = require("./userDb")
const postDb = require("../posts/postDb")
const router = express.Router();

router.post('/', validateUser, (req, res) => {
    const user = req.body;
    db.insert(user)
    .then(user => {
    res.status(201).json(user);
    })
    .catch(err => {
    res.status(500).json({
    error: "There was an error while saving the user"
    });
  });
});

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
    const post = req.body;
    postDb.insert(post)
    .then(post => {
      res.status(201).json(post);
    })
    .catch(err => {
      res.status(500).json({
        error: "There was an error while saving the post"
      });
    });
});

router.get('/', async (req, res) => {
    try {
        const users = await Users.get(req.query);
        res.status(200).json(users);
      } catch (error) {
        // log error to server
        console.log(error);
        res.status(500).json({
          message: 'Error retrieving the user',
        });
      }
 });

router.get('/:id', validateUserId, (req, res) => {
  user = req.user;
  res.status(200).json(user);
});

router.get('/:id/posts', validateUserId, (req, res) => {
    const {id} = req.params.id;
    db.getUserPosts(id).then(posts => {
      res.status(200).json(posts);
    }).catch(err => {
      res
        .status(500)
        .json({ error: "The information could not be retrieved." });
    })
});

router.delete('/:id', (req, res) => {
const {id} = req.params;
    Users.remove(id)
    .then(id => {
        if(id) {
            res.json('user has been removed')
        } else {
            res.status(404).json('invalid !!!')
        }
    })
    .catch(err => {
        res.status(500).json('error deleting user')
    })
});

router.put('/:id', validateUserId, (req, res) => {
    const id = req.params.id;
    const newUser = req.body;
    db.update(id, newUser).then(count => {
      res.status(200).json(newUser);
    }).catch(err => {
      res.status(500).json({error: "user could not be updated"})
    })
});

//custom middleware

function validateUserId(req, res, next) {
    const id = req.params.id;
    db.getById(id).then(user => {
    console.log(user);
    if (!user) {
      res.status(400).json({ message: "invalid user id" })
    } else {
      req.user = user;
      next();
    }
  }).catch(err => {
    console.log(err);
    res.status(500).json({ message: "user could not be retrieved" })
  })
};

function validateUser(req, res, next) {
 if (!req.body) {
        res.status(400).json({ message: "missing user data" })
      } else if (!req.body.name) {
        res.status(400).json({ message: "missing required name field" })
      } else {
        next();
      }
};

function validatePost(req, res, next) {
    if (!req.body) {
        res.status(400).json({ message: "missing post data" })
      } else if (!req.body.text) {
        res.status(400).json({ message: "missing required text" })
      } else if (!req.body.user_id) {
        res.status(400).json({ message: "missing required user id" })
      } else {
        next();
      }
};

module.exports = router;
