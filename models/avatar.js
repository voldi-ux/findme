const mongoose = require('mongoose')
const { Schema} = mongoose 

const Avatar = new Schema({
    path: {
        type:String,
        required:true
    }
})


module.exports = mongoose.model('avatar', Avatar)