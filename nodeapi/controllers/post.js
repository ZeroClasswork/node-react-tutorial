const _ = require('lodash')
const formidable = require('formidable')
const fs = require('fs')

const Post = require('../models/post')

exports.postById = (req, res, next, id) => {
    Post.findById(id)
    .populate("poster", "_id name")
    .exec((err, post) => {
        if (err || !post) return res.status(400).json({
            error: err
        })
        req.post = post
        next()
    })
}

exports.getPosts = (req, res) => {
    Post.find()
    .populate("poster", "_id name")
    .select("_id title body photo")
    .then(posts => {
        res.json({ posts })
    })
    .catch(error => {
        console.log(error)
    })
}

exports.createPost = (req, res) => {
    let form = new formidable.IncomingForm()
    form.keepExtensions = true
    form.parse(req, (err, fields, files) => {
        if (err) return res.status(400).json({
            error: "Image could not be uploaded"
        })
        let post = new Post(fields)
        post.poster = req.profile
        if (files.photo) {
            post.photo.data = fs.readFileSync(files.photo.path),
            post.photo.contentType = files.photo.type
        }
        post.save((err, result) => {
            if (err) return res.status(400).json({
                error: err
            })
            req.profile.hashword = undefined
            req.profile.salt = undefined
            req.profile.email = undefined
            res.json(result)
        })
    })
}

exports.postsByUser = (req, res) => {
    Post.find({ poster: req.profile._id })
        .populate('poster', "_id name")
        .sort("_created")
        .exec((err, posts) => {
            if (err) return res.status(400).json({
                error: err
            })
            res.json(posts)
        })
}

exports.updatePost = (req, res, next) => {
    let post = req.post
    post = _.extend(post, req.body)
    post.updated = Date.now()
    post.save(err => {
        if (err) return res.status(400).json({
            error: err
        })
        res.json(post)
    })
}

exports.isPoster = (req, res, next) => {
    if (!(req.post && req.auth && req.post.poster._id == req.auth._id)) {
        return res.status(403).json({
            error: "Only poster can access this function"
        })
    }
    next()
}

exports.deletePost = (req, res) => {
    let post = req.post
    post.remove((err, post) => {
        if (err) return res.status(400).json({
            error: err
        })
        res.json({ 
            message: "Post deleted successfully"
        })
    })
}