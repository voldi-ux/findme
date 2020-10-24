const mongoose = require('mongoose')
const { Schema} = mongoose 

const UserChema = new Schema({
    userName:{
        type:String,
        required:true
    },
    hasProfile: {
      type:Boolean
    },
    avatarUrl: {
      type:String,
    },
    email: {
      type:String,
      required:true
    },
    password: {
      type:String,
      required:true
    },
    chatroomIds: [],
    profileId: {
             type:mongoose.Types.ObjectId,
             ref: 'profile'
    }
})

module.exports = mongoose.model('user', UserChema)