const Avatars = require("../models/avatar");

exports.getAvatars = async (req, resp, next) => {
  console.log(req)
  const avatars = await Avatars.find();
  console.log(avatars);
  return resp.json(avatars);
};
