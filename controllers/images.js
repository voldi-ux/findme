const Avatars = require("../models/avatar");

exports.getAvatars = async (req, resp, next) => {
  const avatars = await Avatars.find();
//   console.log(avatars);
  return resp.json(avatars);
};
