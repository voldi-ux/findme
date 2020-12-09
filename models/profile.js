const mongoose = require('mongoose')
const { Schema} = mongoose 

const UserChema = new Schema({
    name:{
        type:String,
        required:true
    },
    surname: {
      type:String,
      required:true
    },
    age: {
      type:String,
      required:true
    },

    avatarUrl: {
        type:String,
        required:true
    },
    currentLocation: {
        type:String,
        required:true
    },
    town: {
        type:String,
        required:true
    },
    country: {
        type:String,
        required:true
    },
    bio: {
        type:String,
        required:true
    },
    phone:{
        type:String
    },
    email:{
        type:String
    },
    gallary: {
        type:[{type:String}]
       },
       userId: {
        type: mongoose.Types.ObjectId,
        ref: 'user'
},
      
})

module.exports = mongoose.model('profile', UserChema)