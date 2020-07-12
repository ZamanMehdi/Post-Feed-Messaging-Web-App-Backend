const express = require('express');

const { body } = require('express-validator');

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

router.get(
    '/post/:postId', 
    [
        body('title')
            .trim()
            .isLength({ min: 5 }),
        body('content')
            .trim()
            .isLength({ min: 5 })
    ],
    feedControllers.getPost);

router.put('/post/:postId', feedControllers.updatePost);

router.delete('/post/:postId', feedControllers.deletePost);

module.exports = router;