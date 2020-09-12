const mongoose = require('mongoose')
const { Schema} = mongoose 

const UserChema = new Schema({
    userName:{
        type:String,
        required:true
    },
    email: {
      type:String,
      required:true
    },
    profile: {
         type:Object
    }
})

module.exports = mongoose.model('user', UserChema)