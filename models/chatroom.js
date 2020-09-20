const mongoose = require('mongoose')
const { Schema} = mongoose 

const ChatRoomSchema = new Schema({
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