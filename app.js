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

const {
  getRoom,
  upadateMessages,
  createRoom,
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
    methods: ["GET", "POST"]
  }
});
const port = process.env.PORT || 5005;
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "images"));
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + Date.now() + file.originalname);
  },
});
const getImages = multer({ storage: storage });

// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader("Access-Control-Allow-Methods", "GET,PUT,DELETE,PATCH,POST");
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "Content-Type",
//     "Authorization"
//   );
//   next();
// });

app.use(bodyParser.json({ limit: 50000000000 }));
app.use(bodyParser.urlencoded({ extended: true, limit: 500000000 }));
app.use(cors({
  "origin": "*",
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  "preflightContinue": false,
  "optionsSuccessStatus": 204
}));

app.use(
  "/postprofile",
  getImages.fields([{ name: "gallaries", maxCount: 10 }])
);
app.use(
  "/update-profile",
  getImages.fields([{ name: "profile-image", maxCount: 1 }])
);

app.use(ProfileRoutes);
app.use(authRoutes);
app.use(ChatRoutes);
app.use(express.static(path.join(__dirname, "client/build")));
app.use("/images", express.static(path.join(__dirname, "images")));

app.use("*", (req, resp) =>
  resp.sendFile(path.join(__dirname, "client/build", "index.html"))
);

// io.set("transports", ["websocket"]);
console.log(moment("12/12/2020", "MMDDYYYY").fromNow());

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
    console.log(`${name} has joined and the room ${roomId}`);

    // const room = await getRoom(roomId);
    theRoom = roomId;
    await socket.join(roomId);
    console.log(socket.rooms);
    socket.on("message", async ({ roomId, name, msg }) => {
      //recieve the message and then save it to the database
      console.log(`${name} has send message  and the roomNo is ${roomId}`);
      console.log("messaging worked", name, msg);
      //  const room = await getRoom(roomId)
      // const newRoom = await upadateMessages(roomId, { name, msg });

      // io.to(roomId).emit("recievedMsg", { name, msg });
      console.log(name, 'name ')
      io.to(roomId).emit("recievedMsg", {
        _id:Date.now()*Math.random(),
        name,
        msg,
        time: moment().format("L"),
      });
      upadateMessages(roomId, {
        name,
        msg,
        time: moment().format("L"),
      });
      socket.emit("sendMessage", () => {
        //after saving send back to the client
      });
    });
    socket.on("createroom", ({ userId1, userId2 }) => {
      //create a room if does not exist yet!!!
      // createRoom([userId1,userId2])
      console.log(userId1, userId2);
    });
  });
  //mobile app connections

  socket.on("msg", (msg) => console.log(msg));

  socket.on("disconnect", ({ name }) => {
    console.log("someone has disconnected" + " " + name);
  });
});

//  io.on('connection', (socket) => {
//     console.log('we have a new connection')
//     socket.on('jion', ({name,room}) => {
//      console.log(name,room)
//     })
//       socket.on('disconnect', () => {
//          console.log('user has left')
//       })
//   })

mongoose
  .connect(
    MONGO_URI,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    { useFindAndModify: false }
  )
  .then(() => {
    server.listen(port, () => {
      console.log("connected");
    });
  });
