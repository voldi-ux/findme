const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserChema = new Schema({
  userName: {
    type: String,
    required: true,
  },
  hasProfile: {
    type: Boolean,
  },
  avatarUrl: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  chatroomIds: [
    {
      type: mongoose.Types.ObjectId,
      ref: "chatroom",
    },
  ],
  profile: {
    name: {
      type: String,
    },
    surname: {
      type: String,
    },

    avatarUrl: {
      type: String,
      default:
        "https://dmrmechanical.com/wp-content/uploads/2018/01/avatar-1577909_640.png",
    },
    city: {
      type: String,
    },

    country: {
      type: String,
      default: "South Africa",
    },
    bio: {
      type: String,
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
    gender: { type: String },
  },
  skills: {
    type: [{ type: String }],
  },
});

module.exports = mongoose.model("user", UserChema);
