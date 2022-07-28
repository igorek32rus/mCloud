const {Schema, model, ObjectId} = require("mongoose")

const File = new Schema({
    name: {type: String, required: true},
    type: {type: String, required: true},
    accessLink: {type: String, default: null},
    size: {type: Number, default: 0},
    date: {type: Date, default: new Date()},
    deleted: {type: Date, default: null},
    parent: {type: ObjectId, ref: 'File'},
    childs: [{type: ObjectId, ref: 'File'}],
    user: {type: ObjectId, ref: 'User'}
})

module.exports = model('File', File)