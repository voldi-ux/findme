const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const http = require("http");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const authRoutes = require("./routes/auth");
const ProfileRoutes = require("./routes/UserProfile");
const multer = require("multer");
const socketio = require("socket.io");
const { getRoom, upadateMessages ,createRoom} = require("./utils/socket");

const MONGO_URI = " mongodb://127.0.0.1:27017/findme";
const server = http.createServer(app);
const io = socketio(server);
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "images"));
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + Date.now() + file.originalname);
  },
});

const getImages = multer({ storage: storage });
app.use(
  "/postprofile",
  getImages.fields([{ name: "gallaries", maxCount: 10 }])
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use(ProfileRoutes);
app.use(authRoutes);

app.use(express.static(path.join(__dirname, "client", "build")));
app.use("/images", express.static(path.join(__dirname, "images")));

app.use("*", (req, resp) =>
  resp.sendFile(path.join(__dirname, "client", "build", "index.html"))
);

io.on("connection", (socket) => {
  socket.on("jion", async ({ roomId, name, userId2 }) => {
    console.log(`${name} has joined`);

    const room = await getRoom(roomId);
    await socket.join(roomId);

    socket.on("message", async ({ roomId, name, msg }) => {
      //recieve the message and then save it to the database
      console.log("messaging worked", name, msg);
      //  const room = await getRoom(roomId)
      const newRoom = await upadateMessages(roomId, { name, msg });

      io.to(roomId).emit("recievedMsg", { name, msg });

      socket.emit("sendMessage", () => {
        //after saving send back to the client
      });
    });
    socket.on("createroom", ({ userId1, userId2 }) => {
        //create a room if does not exist yet!!!
        createRoom([userId1,userId2])
      });
    
  });

 
  socket.on("disconnect", () => {
    console.log("disconneted");
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
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    server.listen(5000, () => console.log("app listening"));
  });
