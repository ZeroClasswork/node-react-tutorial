const mongoose = require("mongoose")
const uuidv1 = require("uuid/v1")
const crypto = require("crypto")

const userSchema = new mongoose.Schema({
    name: {
        type: String, 
        trim: true,
        required: true
    },
    email: {
        type: String, 
        trim: true,
        required: true
    },
    hashword: {
        type: String, 
        required: true
    },
    salt: String, 
    created: {
        type: Date, 
        default: Date.now
    }, 
    updated: Date
})

// virtual fields
userSchema.virtual("password")
.set(function(password) {
    this._password = password
    // generate a timestamp
    this.salt = uuidv1()
    // encrypt password
    this.hashword = this.encryptPassword(password)
})
.get(() => {
    return this._password
})

userSchema.methods = {
    authenticate: function(plaintext) {
        return this.encryptPassword(plaintext) === this.hashword
    },

    encryptPassword: function(password) {
        if (!password) return ""
        try {
            return crypto.createHmac('sha1', this.salt)
                         .update(password)
                         .digest('hex')
        } catch (err) {
            return ""
        }
    }
}

module.exports = mongoose.model("User", userSchema)