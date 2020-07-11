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
    const title = req.body.title;
    const content = req.body.content;

    res.status(201).json({
        message: 'Post Created Successfully',
        post: {
            _id: new Date().toISOString(),
            title: title,
            content: content,
            creator: {
                name: 'Zaman'
            },
            createdAt: new Date()
        }
    })
}