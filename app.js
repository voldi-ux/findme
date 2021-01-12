const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const http = require("http");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const authRoutes = require("./routes/auth");
const ProfileRoutes = require("./routes/UserProfile");
const ChatRoutes = require("./routes/chat");
const multer = require("multer");
const socketio = require("socket.io");
const moment = require("moment");
const {getAvatars} = require('./controllers/images')
const {
  upadateMessages,
  createProfile,
} = require("./utils/socket");

const MONGO_URI =
  process.env.NODE_ENV === "production"
    ? "mongodb+srv://voldi2:findme@cluster0.gulxq.mongodb.net/findme?retryWrites=true&w=majority"
    : "mongodb://127.0.0.1:27017/findme";

const server = http.createServer(app);
const io = socketio(server, {
  pingInterval: 0.5,
  pingTimeout: 8000,
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});
const port = process.env.PORT || 5005;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);
app.use('/getAvatars', getAvatars)
app.use(ProfileRoutes);
app.use(authRoutes);
app.use(ChatRoutes);
app.use(express.static(path.join(__dirname, "client/build")));
app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/avatars", express.static(path.join(__dirname, "avatars")));
app.use("*", (req, resp) =>
  resp.sendFile(path.join(__dirname, "client/build", "index.html"))
);


io.on("connection", (socket) => {
  console.log("someone has joined the socket");

  //for creating a user profile
  socket.on("user room", async (room) => {
    await socket.join(room);
    socket.on("save profile", async (profile) => {
      const UserProfile = await createProfile(profile.userId, profile);
      if (UserProfile) {
        console.log(UserProfile);
        io.to(room).emit("profile created", UserProfile);
      } else {
        io.to(room).emit(" creating profile faild", "error");
      }
    });
  });

  //for messaging
  let theRoom;
  socket.on("join", async ({ roomId, name, userId2 }) => {


    // const room = await getRoom(roomId);
    theRoom = roomId;
    await socket.join(roomId);

    socket.on("message", async ({ roomId, name, msg }) => {
      //recieve the message and then save it to the database
      
      //  const room = await getRoom(roomId)
      // const newRoom = await upadateMessages(roomId, { name, msg });

      // io.to(roomId).emit("recievedMsg", { name, msg });
      console.log(name, "name ");
      io.to(roomId).emit("recievedMsg", {
        _id: Date.now() * Math.random(),
        name,
        msg,
        time: moment().format('LLLL'),
      });
      upadateMessages(roomId, {
        name,
        msg,
        time: moment().format('LLLL'),
      });
      socket.emit("sendMessage", () => {
        //after saving send back to the client
      });
    });

    //typing sockets
    socket.on('typing', ({roomId}) => {
     socket.to(roomId).broadcast.emit('typing')
    })
    socket.on('typingEnd', ({roomId}) => {
     socket.to(roomId).broadcast.emit('typingEnd')
    })
    socket.on("createroom", ({ userId1, userId2 }) => {
      //create a room if does not exist yet!!!
      // createRoom([userId1,userId2])
      console.log(userId1, userId2);
    });
  });
  //mobile app connections

  socket.on("msg", (msg) => console.log(msg));

  socket.on("disconnect", () => {
    console.log("someone has disconnected");
  });
});



mongoose
  .connect(
    MONGO_URI,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    },
  
  )
  .then(() => {
    server.listen(port, () => {
      console.log("connected");
    });
  });
