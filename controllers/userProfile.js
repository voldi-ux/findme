const Profile = require("../models/profile")



exports.getUserProfile = async(req,resp,next) => {
  try {
    const {userId} = req.params
    console.log(userId)
    const profile = await (await Profile.findOne({userId:userId})).execPopulate('userId')
    
    return resp.json({
      type:'success',
      message:'succeded',
      profile:profile
    })
  } catch (error) {
     console.log(error)
  }
  }