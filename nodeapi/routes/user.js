const express = require('express')
const { userById, allUsers, getUser, updateUser, deleteUser } = require('../controllers/user')
const { postsByUser } = require('../controllers/post')
const { requireSignin } = require('../controllers/auth')

const router = express.Router()

router.get('/', allUsers)
router.get('/:userId', requireSignin, getUser)
router.get('/:userId/posts', postsByUser)
router.put('/:userId', requireSignin, updateUser)
router.delete('/:userId', requireSignin, deleteUser)

router.param("userId", userById)

module.exports = router