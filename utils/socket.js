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
  const room = await Chatroom.find({_id:roomId})
  room.messages = [...room.messages, msg]
   return  await room.save()
} 

const createRoom = async(arrOfid) => {
    const  newchatroom =await new Chatroom({
         messages:[]
    })
    arrOfid.forEach( async(id) => {
        const user = await User.findById(id)
         user.chatroomIds = user.chatroomIds.push(newchatroom._id)
         await user.save() 
    })
    

}
module.exports = {
    getRoom,
    upadateMessages,
    createRoom
}