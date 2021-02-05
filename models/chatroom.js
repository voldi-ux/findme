const mongoose = require('mongoose')
const { Schema} = mongoose 

const ChatRoomSchema = new Schema({
    timeStemp: {
        type:Number,
    },
    user1: {
        type:mongoose.SchemaTypes.ObjectId,
        ref:'user'
    },
    user2: {
        type:mongoose.SchemaTypes.ObjectId,
        ref:'user'
    },
      messages: [{
          name: {
              type:String,
             
          },
          time: {
              type:String
          },
          msg: {
           type: String,
           
          },
          seen:{
            type:Boolean,
            default:false
      }}]
})


module.exports = mongoose.model('chatroom', ChatRoomSchema)