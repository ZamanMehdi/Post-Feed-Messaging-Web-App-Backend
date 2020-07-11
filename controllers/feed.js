const { validationResult } = require('express-validator/check');

const Post = require('../models/post');

exports.getPosts = (req, res, next) => {
    res.status(200).json({
        posts: [
            {
                _id: '123',
                title: 'First Post',
                content: 'This is my First Post!',
                imageUrl: '/images/pic1.png',
                creator: {
                    name: 'Zaman',
                },
                createdAt: new Date()
            }
        ]
    })
}

exports.postCreatePost = (req, res, next) => {
    let error = validationResult(req);
    if (!error.isEmpty()) {
        let error = new Error('validation failed due to incorrect data.');
        error.statusCode=422;
        throw error;
    }
    const title = req.body.title;
    const content = req.body.content;
    
    const post = new Post({
        title: title,
        content: content,
        imageUrl: 'images/pic1.png',
        creator: {name: 'Zaman'},
    });
    post
    .save()
    .then(result=>{
        console.log(result);
        res.status(201).json({
            message: 'Post Created Successfully',
            post: result
        })
    })
    .catch(err=>{
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    })
}