const { findOneAndUpdate } = require("../models/profile");
const Profile = require("../models/profile");
const User = require("../models/User");

exports.getUserProfile = async (req, resp, next) => {
  try {
    const { userId } = req.params;
    console.log(userId);

    const profile = await (
      await Profile.findOne({ userId: userId })
    ).execPopulate(["userId"]);

    return resp.json({
      type: "success",
      message: "succeded",
      profile: profile,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.getProfiles = async (req, resp, next) => {
  const { pageItems, pageNum } = await req.params;
  // const res = await Profile.updateMany({}, {email:'randomemail@gmail.com',
  // phone:094745723})
  
  try {
    const profiles = await Profile.find()
      .skip(+pageItems * +pageNum - 4)
      .populate("userId")
      .exec();
    resp.json({
      profiles: profiles,
    });
  } catch (error) {
    console.log(error);
  }
};

//constructor function

// function FilterObj(name, country, town, gender, name, surname) {
//   name ? (this.name = name) : null;
//   country ? (this.country = country) : null;
//   town ? (this.town = town) : null;
//   gender ? (this.gender = gender) : null;
//   name ? (this.name = name) : null;
//   surname ? (this.surname = surname) : null;
// }

// function isEmpty(obj) {
//   return Object.keys(obj).length === 0;
// }

exports.getfilteredProfiles = async (req, resp, next) => {
  const { name, country, town, gender, surname } = req.body;

  // const filterObj = new FilterObj(name, country, town, gender, name, surname);
  // const filter = isEmpty(filterObj) ? null : filterObj;

  try {
    const profiles = await Profile.find({
      $or: [
        { name: name },
        {
          $or: [
            { surname: surname || "not vallid" },
            { surname: name || "not vallid" },
          ],
        },
        { country: country || "not vallid" },
        { gender: gender || "not vallid" },
        { town: town || "not vallid" },
      ],
    })
      .populate("userId")
      .exec();

    return resp.json({
      message: "success",
      profiles: profiles,
    });
  } catch (error) {
    console.log(error.message);
  }
};

exports.postProfile = async (req, resp, next) => {
  try {
    const gallery = await req.body.gallery;
    const profile = await new Profile({
      ...req.body,
      gallary: gallery,
      avatarUrl:
        "https://dmrmechanical.com/wp-content/uploads/2018/01/avatar-1577909_640.png",
    });
    await User.findOneAndUpdate({ _id: req.body.userId }, { hasProfile: true });
    await profile.save();
    return resp.redirect("/home");
  } catch (err) {
    console.log(err.message);
  }
};

//update the user profile

exports.updateProfile = async (req, resp, next) => {
  try {
    const { userId, profileUrl } = req.body;
    console.log("updating user profile");
    const profile = await Profile.findOneAndUpdate(
      { userId },
      {
        avatarUrl: profileUrl,
      }
    );

    const user = await User.findByIdAndUpdate(userId, {
      avatarUrl: profileUrl,
    });

    return resp.json({ msg: "success" });
  } catch (error) {
    console.log(error.message);
  }
};

//mobile controllers
exports.getProfilesMobile = async (req, resp, next) => {
  const { itemsCount } = await req.params;
  // const res = await Profile.updateMany({}, {email:'randomemail@gmail.com',
  // phone:094745723})

  try {
    const profiles = await Profile.find()
      .skip(+itemsCount)
      .limit(20)
      .populate("userId")
      .exec();

    return resp.json({
      profiles: profiles,
    });
  } catch (error) {
    console.log(error);
  }
};
