const moment = require("moment");
const { upadateMessages,makeSeen } = require("../utils/socket");

module.exports = (socket,io) => {

  //for messaging
  socket.on("join", async ({ roomId }) => {

    await socket.join(roomId);
  });
  socket.on("message", async ({ roomId, name, msg,seen }) => {
    //recieve the message and then save it to the database

    io.to(roomId).emit("recievedMsg", {
      _id: Date.now() * Math.random(),
      name,
      msg,
      time: moment().format("LLLL"),
      seen
    });
    upadateMessages(roomId, {
      name,
      msg,
      time: moment().format("LLLL"),
      seen
    });

    //typing sockets
  });
  socket.on("typing", ({ roomId }) => {
    socket.to(roomId).broadcast.emit("typing");
  });
  socket.on("typingEnd", ({ roomId }) => {
    socket.to(roomId).broadcast.emit("typingEnd");
  });
  socket.on("OnActive", ({ roomId }) => {

    socket.to(roomId).broadcast.emit("active");
  });
  socket.on("OnActive2", ({ roomId }) => {

    socket.to(roomId).broadcast.emit("ActiveRecieved");
  });

  socket.on("unActive", ({ roomId }) => {

    socket.to(roomId).broadcast.emit("onUnActive");
  });
  
  socket.on('seen', async({roomId,name}) => {
    const room =  await makeSeen(roomId,name)
    socket.to(roomId).emit("onSeen",[] || room.messages);
  })
  socket.on("disconnect", () => {
    console.log("someone has disconnected");
  });
}