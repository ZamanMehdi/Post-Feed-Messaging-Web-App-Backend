exports.getPosts = (req, res, next) => {
    res.status(200).json({
        posts: [{}]
    })
}

exports.postCreatePost = (req, res, next) => {
    const title = req.body.title;
    const content = req.body.content;
    
    res.status(201).json({
        message: 'Post Created Successfully',
        post: {
            id: new Date().toISOString(),
            title: title,
            content: content
        }
    })
}