const express = 'express';
// const Users = require('./userDb.js')
const router = express.Router();

router.post('/', (req, res) => {

});

router.post('/:id/posts', (req, res) => {

});

router.get('/', (req, res) => {
    // try {
    //     const users = await Users.get(req.query);
    //     res.status(200).json(users);
    //   } catch (error) {
    //     // log error to server
    //     console.log(error);
    //     res.status(500).json({
    //       message: 'Error retrieving the posts',
    //     });
    //   }
});

router.get('/:id', (req, res) => {

});

router.get('/:id/posts', (req, res) => {

});

router.delete('/:id', (req, res) => {

});

router.put('/:id', (req, res) => {

});

//custom middleware

function validateUserId(req, res, next) {

};

function validateUser(req, res, next) {

};

function validatePost(req, res, next) {

};

module.exports = router;
