const express = require('express');

const feedControllers = require('../controllers/feed');

const router = express.Router();

//GET /feed/posts
router.use('/posts', feedControllers.getPosts);

//POST /feed/post
router.use('/post', feedControllers.postCreatePost);

module.exports = router;