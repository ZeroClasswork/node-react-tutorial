const express = require('express')

const { 
    getPosts, 
    createPost, 
    postById, 
    isPoster, 
    deletePost, 
    updatePost 
} = require('../controllers/post')
const { requireSignin } = require('../controllers/auth')
const { userById } = require('../controllers/user')

const { createPostValidator } = require('../validator')

const router = express.Router()

router.get('/', getPosts)
router.post('/post/new/:userId', 
    requireSignin,
    createPost, 
    createPostValidator
)
router.put('/post/:postId', 
    requireSignin, 
    isPoster, 
    updatePost
)
router.delete('/post/:postId', 
    requireSignin, 
    isPoster, 
    deletePost
)

router.param("userId", userById)
router.param("postId", postById)

module.exports = router