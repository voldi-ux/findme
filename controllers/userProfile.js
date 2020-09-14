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

  exports.getProfiles = async(req,resp,next) => {
    console.log(req.params)
    const  { pageItems,pageNum}  = req.params
      try {
        const profiles = await Profile.find().skip(4*pageNum - 4).limit(4)
        resp.json({
          profiles:profiles
        })
      } catch (error) {
        
      }
  }