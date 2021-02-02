const Chatroom = require('../models/chatroom')

const upadateMessages =async (roomId, msg) => {
try {
  
  const room = await Chatroom.findOneAndUpdate({_id:roomId}, {
    timeStemp:Date.now(),
    $push: {
        'messages': msg
    }
  })
  
  // const rooms = await Chatroom.updateMany({}, {
  //    $set:{
  //     'messages.$[el].seen':true,
  //    },
  // },{new:true,arrayFilters:[{'el.seen': {$exists:false}}]})

} catch (error) {
  console.log(error.message)
  
}
} 



module.exports = {
    upadateMessages,
}