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
  const room = await Chatroom.findOneAndUpdate({_id:roomId}, {
    $push: {
        'messages': msg
    }
  })
  
  console.log(room)
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
         avatarUrl:"https://dmrmechanical.com/wp-content/uploads/2018/01/avatar-1577909_640.png"
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