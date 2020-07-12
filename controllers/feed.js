const { validationResult } = require('express-validator');

const Post = require('../models/post');

exports.getPosts = (req, res, next) => {
    Post.find()
        .then(posts => {
            res.status(200).json({
                message: 'Fetched Data Successfully',
                posts: posts
            })
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })
};

exports.postCreatePost = (req, res, next) => {
    let error = validationResult(req);
    if (!error.isEmpty()) {
        let error = new Error('validation failed due to incorrect data.');
        error.statusCode = 422;
        throw error;
    }
    if (!req.file) {
        let error = new Error('No Image Provided');
        error.statusCode = 422;
        throw error;
    }
    const title = req.body.title;
    const content = req.body.content;
    const imageUrl = req.file.path.replace("\\", "/");

    const post = new Post({
        title: title,
        content: content,
        imageUrl: imageUrl,
        creator: { name: 'Zaman' },
    });
    post
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: 'Post Created Successfully',
                post: result
            })
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })
};

exports.getPost = (req, res, next) => {
    const postId = req.params.postId;
    Post.findById(postId)
        .then(post => {
            if (!post) {
                let error = new Error('Could not found post.')
                error.statusCode = 404;
                throw error;
            };
            res.status(200).json({
                message: 'Post Fetced',
                post: post
            });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })
};