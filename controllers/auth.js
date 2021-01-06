const sendGrid = require("@sendgrid/mail");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Profile = require("../models/profile");
const { users } = require("../testData");
const Avatar = require("../models/avatar");
const { paths } = require("../avatarPaths");

const api_key =
  "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";

sendGrid.setApiKey(api_key);

//should handle errors latter on
exports.postSigningUp = async (req, resp, next) => {
  // return crypto.randomBytes(42, (err, buffer) => {
  //   const token = buffer.toString("hex");
  //   const { name, email } = req.body;
  //   try {
  //     sendGrid
  //       .send({
  //         to: email,
  //         from: "voldimuyumba2001@gmail.com",
  //         subject: "verify email ",
  //         html: `<p> to very your email please click <a href="http://localhost:5000/getcredentials/?uva=${token}&&name=${name}&&email=${email}"> here</a> </p>`,
  //       })
  //       .then(() => {
  //         return resp.redirect("/emailverification");
  //       })
  //       .catch((err) => console.log(err.message));
  //   } catch (error) {
  //     console.log(error);
  //   }
  // });
};

exports.postSignin = async (req, resp, next) => {
  // await paths.forEach(async path => {
  //   console.log(path)
  //   return new Avatar(path).save()
  // })

  const { password, email } = req.body;

  try {
    const user = await User.findOne({
      email: email,
    });

    if (!user) {
      //    logic for email not found
      throw new Error(" a user a with that email does not exists");
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) throw Error("incorrect email or password");

    const token = jwt.sign(
      {
        userId: user._id.toString(),
      },
      "voldi",
      {}
    );

    return resp.status(201).json({
      type: "success",
      user: {
        _id: user._id,
        chatroomIds: user.chatroomIds,
        userName: user.userName,
        avatarUrl: user.avatarUrl,
        hasProfile: user.hasProfile,
        profile: user.profile,
      },
      token: token,
      message: "access granted",
    });

  } catch (error) {
    return resp.json({
      type: "error",
      message: error.message,
    });
  }
};

exports.signUp = async (req, resp, next) => {
  try {
    const { password, confirmPassword, name, email } = req.body;

    const existingUser = await User.findOne({ email: email });
    console.log(existingUser);
    if (existingUser) {
      throw new Error(" a user with that email already exists");
    }

    if (password !== confirmPassword) {
      throw new Error("passwords do not match");
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await new User({
      userName: name,
      email: email,
      hasProfile: false,
      password: hashedPassword,
    }).save();

    const token = jwt.sign(
      {
        userId: user._id.toString(),
      },
      "voldi",
      {}
    );

    return resp.status(201).json({
      type: "success",
      user: {
        _id: user._id,
        chatroomIds: user.chatroomIds,
        userName: user.userName,
        avatarUrl: user.avatarUrl,
        hasProfile: user.hasProfile,
        profile: user.profile,
      },
      token: token,
      message: "access granted",
    });
  } catch (error) {
    console.log(error.message);
    return resp.status(400).json({
      type: "error",
      message: error.message,
    });
  }
};
