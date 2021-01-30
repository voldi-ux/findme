const Chatroom = require('../models/chatroom')

const upadateMessages =async (roomId, msg) => {
  console.log(roomId,msg)

  const room = await Chatroom.findOneAndUpdate({_id:roomId}, {
    $push: {
        'messages': msg
    }
  })
  
} 



module.exports = {
    upadateMessages,
}