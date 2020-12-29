const Chatroom = require("../models/chatroom");
const Profile = require("../models/profile");
const User = require("../models/User");

class AppFactory {
  constructor({io}) {}

  sendNotifcation() {}
  connectToOneRoom() {}
  uptdateProfile() {}
  createProfile() {}
  upadateMessages() {}
  listenForNotication(){}
}


module.exports = {
  AppFactory
}