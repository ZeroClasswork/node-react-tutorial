exports.createPostValidator = (req, res, next) => {
    req.check('title', "Write a title").notEmpty()
    req.check('title', "Title cannot be that long").isLength({
        max: 150
    })

    req.check('body', "Body is too long").isLength({
        max: 20000
    })

    const errors = req.validationErrors()

    if (errors) {
        const firstError = errors.map((error) => error.msg)[0]
        return res.status(400).json({error: firstError})
    }
    next()
}

exports.userSignupValidator = (req, res, next) => {
    req.check("name", "Name is required").notEmpty()
    
    req.check("email", "Must be valid email").notEmpty()
    req.check("email")
    .matches(/.+\@.+\../)
    .withMessage("Must be valid email")
    .isLength({
        max: 200
    })

    req.check("password", "Password required").notEmpty()
    req.check("password")
    .isLength({
        min: 6,
        max: 30
    })
    .withMessage("Password must be between 6 and 30 characters, inclusive")
    req.check("password")
    .matches(/\d/)
    .withMessage("Password must contain a number.")

    const errors = req.validationErrors()

    if (errors) {
        const firstError = errors.map((error) => error.msg)[0]
        return res.status(400).json({error: firstError})
    }
    next()
}