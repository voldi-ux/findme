const Avatars = require("../models/avatar");

exports.getAvatars = async (req, resp, next) => {
  const avatars = await Avatars.find();
  return resp.json(avatars);
};
