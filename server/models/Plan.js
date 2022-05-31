const {Schema, model} = require("mongoose")

const Plan = new Schema({
    name: {type: String, required: true, unique: true},
    limit: {type: Number, required: true, default: 1024**3*10}
})

// module.exports = model('Plan', Plan)