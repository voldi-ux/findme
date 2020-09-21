const Chatroom = require('../models/chatroom')
const User = require('../models/User')
const rooms = require('./rooms')

const getRoom = (id) => {
   const room =   rooms.find(room => room.id === id)
   if(room) {
       return room
   }
}

const upadateMessages =async (roomId, msg) => {
  const room = await Chatroom.findOneAndUpdate({_id:roomId}, {
    $push: {
        'messages': msg
    }
  })
  
} 

const createRoom = async(arrOfid) => {
    

}
module.exports = {
    getRoom,
    upadateMessages,
    createRoom
}