const {Schema, model, ObjectId} = require("mongoose")

const User = new Schema({
    email: {type: String, required: true, unique: true},
    pass: {type: String, required: true},
    plan: {type: ObjectId, ref: 'Plan'},
    usedSpace: {type: Number, default: 0},
    avatar: {type: String},
    files: [{type: ObjectId, ref: 'File'}]
})

module.exports = model('User', User)