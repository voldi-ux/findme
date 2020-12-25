const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserChema = new Schema({
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },

  avatarUrl: {
    type: String,
    default:
      "https://dmrmechanical.com/wp-content/uploads/2018/01/avatar-1577909_640.png",
  },
  city: {
    type: String,
    required: true,
  },

  country: {
    type: String,
    default: "South Africa",
  },
  bio: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
  },
  province: {
    type: String,
  },
  email: {
    type: String,
  },
  title: {
    type: String,
  },
  skills: {
    type: [{ type: String }],
  },
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "user",
  },
});

module.exports = mongoose.model("profile", UserChema);
