const express = require('express');

const { body } = require('express-validator/check');

const feedControllers = require('../controllers/feed');

const router = express.Router();

//GET /feed/posts
router.get('/posts', feedControllers.getPosts);

//POST /feed/post
router.post(
    '/post',
    [
        body('title')
            .trim()
            .isLength({ min: 5 }),
        body('content')
            .trim()
            .isLength({ min: 5 })
    ],
    feedControllers.postCreatePost
);

router.get('/post/:postId', feedControllers.getPost);

module.exports = router;