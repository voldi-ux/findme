const moment = require("moment");
const { upadateMessages, makeSeen } = require("../utils/socket");

module.exports = (socket, io) => {
  console.log("connection notification");

  socket.on("join", async ({ roomId }) => {
    console.log("joining notification");

    await socket.join(roomId);
  });
  socket.on("notify", async ({ roomId, name, msg, userId, seen }) => {
    console.log("joining notification");

    //recieve the message and then save it to the database
    socket.to(userId).broadcast.emit("getNotify");

    io.to(roomId).emit("recievedMsg", {
      _id: Date.now() * Math.random(),
      name,
      msg,
      time: moment().format("LLLL"),
      seen,
    });

    upadateMessages(roomId, {
      name,
      msg,
      time: moment().format("LLLL"),
      seen,
    });
  });

  socket.on("seen", async ({ userId, name, roomId }) => {
    console.log('seeing')

    await makeSeen(roomId, name);
    socket.to(userId).broadcast.emit("onSeen");
  });

  socket.on("disconnect", () => {
    console.log("someone has disconnected notification");
  });
};
