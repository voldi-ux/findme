const chatroom = require("../models/chatroom");
const Profile = require("../models/profile");
const User = require("../models/User");

exports.getChats = async (req, res) => {
  const userId = req.params.userId;
  const rooms = await chatroom
    .find({
      $or: [{ user1: userId }, { user2: userId }],
    })
    .sort({ timeStemp: -1 })
    .populate(["user2", "user1"])
    .exec();
  return res.json(rooms);
};

exports.getByUserId = async (req, res) => {
  try {
    const id = req.params.userId.toString();
    const user = await User.findOne({ _id: id }).exec();

    return res.json(user);
  } catch (error) {
    console.log(error);
  }
};

exports.getRoom = async (req, res) => {
  try {
    const { userId1, userId2 } = req.params;
    const arrOfIds = [userId1, userId2];
    let room;
    console.log("getting rooom ");
    room = await chatroom.findOne({
      $or: [
        { $and: [{ user1: userId1 }, { user2: userId2 }] },
        {
          $and: [{ user1: userId2 }, { user2: userId1 }],
        },
      ],
    });

    if (room) return res.json(room);

    //if the room does not exist
    const newchatroom = await new chatroom({
      user1: userId1,
      user2: userId2,
      messages: [],
    });

    arrOfIds.forEach(async (id) => {
      const user = await User.findOneAndUpdate(
        { _id: id },
        {
          $push: {
            chatroomIds: newchatroom._id,
          },
        }
      );
    });

    newchatroom.save();
    return res.json(newchatroom);
  } catch (error) {
    console.log(error.message);
  }
};

exports.getMessages = async (req, resp) => {
  const { roomId } = req.params;
  const room = await chatroom.findById(roomId);
  console.log(room);
  if (room) {
    return resp.json({ msg: "okay", messages: room.messages });
  }
  return resp.json({ msg: "foul" });
};
exports.getRoomsMobile = async (req, res) => {
  try {
    const { userId } = req.params;

    let rooms;

    rooms = await chatroom
      .find({
        $or: [{ user1: userId }, { user2: userId }],
      })
      .populate(["user1", "user2"])
      .exec();
    console.log(rooms);

    return res.json(rooms);
  } catch (error) {
    console.log(error.message);
  }
};

exports.updateNotifications = async (req, resp) => {
  const { userId, type } = req.body;
  console.log(req.body)
  if (type === "get") {
    const user = await User.findById(userId);
    return resp.json({ count: user.notifications });
  }
  if (type === "clear") {
    await User.findByIdAndUpdate(userId, { notifications: 0 });
    return resp.status(200)
  }
};
