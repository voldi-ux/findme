const Chatroom = require("../models/chatroom");
const User = require("../models/User");

const upadateMessages = async (roomId, msg) => {
  try {
    const room = await Chatroom.findOneAndUpdate(
      { _id: roomId },
      {
        timeStemp: Date.now(),
        $push: {
          messages: msg,
        },
      }
    );

    // const rooms = await Chatroom.updateMany({}, {
    //    $set:{
    //     'messages.$[el].seen':true,
    //    },
    // },{new:true,arrayFilters:[{'el.seen': {$exists:true}}]})
  } catch (error) {
    console.log(error.message);
  }
};
const upadateNotifications = async(userId) => {
  await User.findByIdAndUpdate(userId, {$inc: {
    notifications: 1
  }});
}
const makeSeen = async (roomId, name ) => {
  try {
    const room = await Chatroom.findOneAndUpdate(
      { _id: roomId },
      {
        $set: {
          "messages.$[el].seen": true,
        },
      },
      { arrayFilters: [{ "el.name": { $ne: name },'el.seen':false}],new:true}
    );
    return room;
  } catch (error) {
    console.log(error.meesage);
  }
};

module.exports = {
  upadateMessages,
  makeSeen,
  upadateNotifications
};
