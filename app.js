
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
const socketio = require("socket.io");
const moment = require("moment");
const { getAvatars } = require("./controllers/images");
const messageSocket = require("./socket/message");
const notificationSocket = require("./socket/notification");

const MONGO_URI =
  process.env.NODE_ENV == "production"
    ? "mongodb://voldi2:findmepassword@cluster0-shard-00-00.gulxq.mongodb.net:27017,cluster0-shard-00-01.gulxq.mongodb.net:27017,cluster0-shard-00-02.gulxq.mongodb.net:27017/findme?ssl=true&replicaSet=atlas-xe2t2h-shard-0&authSource=admin&retryWrites=true&w=majority"
    : "mongodb://127.0.0.1:27017/findme";

const server = http.createServer(app);
const io = socketio(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});
const port = process.env.PORT || 5005;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true, limit: 500000000 }));
app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);
app.use("/getAvatars", getAvatars);
app.use(ProfileRoutes);
app.use(authRoutes);
app.use(ChatRoutes);
app.use(express.static(path.join(__dirname, "client/build")));
app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/images/wallpapers", express.static(path.join(__dirname, "images")));
app.use("/avatars", express.static(path.join(__dirname, "avatars")));
app.use("*", (req, resp) =>
  resp.sendFile(path.join(__dirname, "client/build", "index.html"))
);
io.of("/").on("connection", (socket) => {
  messageSocket(socket, io);
});

io.of("/notifications").on("connection", (socket) => {
  notificationSocket(socket, io);
});

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    server.listen(port, () => {
      console.log("connected");
    });
  });
