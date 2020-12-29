const Chatroom = require('../models/chatroom')
const Profile = require('../models/profile')
const User = require('../models/User')
const rooms = require('./rooms')

const getRoom = (id) => {
   const room =   rooms.find(room => room.id === id)
   if(room) {
       return room
   }
}

const upadateMessages =async (roomId, msg) => {
  console.log(roomId,msg)

  const room = await Chatroom.findOneAndUpdate({_id:roomId}, {
    $push: {
        'messages': msg
    }
  })
  
} 

const createRoom = async(arrOfid) => {
    

}

const createProfile = async(userId,userProfile) => {
    try {
    
     const user = await User.findOneAndUpdate({_id:userId}, {
       hasProfile:true,
       profile:{
         ...userProfile,
         country:"South Africa",
        
       }
     },{
       new:true
     })
  
     return {
       user
     }
    } catch (error) {
      console.log(error.message)
      return null
    }
} 
module.exports = {
    getRoom,
    upadateMessages,
    createRoom,
    createProfile
}