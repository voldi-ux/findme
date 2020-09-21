const mongoose = require('mongoose')
const { Schema} = mongoose 

const ChatRoomSchema = new Schema({
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
           
          }
      }]
})


module.exports = mongoose.model('chatroom', ChatRoomSchema)