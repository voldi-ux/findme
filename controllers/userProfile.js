const Profile = require("../models/profile");

exports.getUserProfile = async (req, resp, next) => {
  try {
    const { userId } = req.params;
    console.log(userId);
    const profile = await (
      await Profile.findOne({ userId: userId })
    ).execPopulate("userId");

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
  console.log(req.params);
  const { pageItems, pageNum } = await req.params;
  try {
    const profiles = await Profile.find()
      .skip(+pageItems * +pageNum - 4)
      .limit(+pageItems);
    resp.json({
      profiles: profiles,
    });
  } catch (error) {
    console.log(error);
  }
};

//constructor function

function FilterObj(age, country, town, gender,name,surname) {
  age ? (this.age = age) : null;
  country ? (this.country = country) : null;
  town ? (this.town = town) : null;
  gender ? (this.gender = gender) : null;
  name ? (this.name = name) : null;
  surname ? (this.surname = surname) : null;
}

function isEmpty(obj) {
  return Object.keys(obj).length === 0
}

exports.getfilteredProfiles = async (req, resp, next) => {
  console.log(req.body)
  const { pageItems, pageNum } = await req.params;
  const { age, country, town, gender,name,surname } = req.body;
  const filterObj = new FilterObj(age, country, town, gender,name,surname);
  const filter = isEmpty(filterObj) ? null : filterObj

  console.log(filterObj)
  try {
    const profiles = await Profile.find(filter)
      

    return resp.json({
      message: "success",
      profiles: profiles,
    });
  } catch (error) {
    console.log(error);
  }
};
