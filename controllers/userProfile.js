const { changeFilterData } = require("../utils");
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
  console.log(pageItems);
  try {
    const profiles = await User.find({ hasProfile: true })
      .skip(+pageItems)
      .limit(4)
      .exec();
    resp.json({
      profiles: profiles,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.Search = async (req, resp, next) => {
  // $regex: "s", $options: "i"
  try {
    const { searchString } = req.params;
    const usersFound = await User.find({
      $or: [
        {
          "profile.name": { $regex: searchString, $options: "i" },
        },
        {
          "profile.surnname": { $regex: searchString, $options: "i" },
        },
        {
          "profile.title": { $regex: searchString, $options: "i" },
        },
        {
          "profile.bio": { $regex: searchString, $options: "i" },
        },
      ],
    });

    return resp.send(usersFound);
  } catch (error) {
    console.log(error.message);
  }
};

// const arr = [
//   { province: "Eastern Cape" },
//   { city: "Newcastle" },
//   { gender: "male" },
// ];

exports.getfilteredProfiles = async (req, resp, next) => {
  const { data } = req.body;
  const filters = changeFilterData(data);
  console.log(filters);
  try {
    const profiles = await User.find({
      $or: [...filters],
    });
    console.log(profiles);
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
  const {userId,profile} = req.body
  try {
    
    const user = await User.findOneAndUpdate({_id:userId}, {
      hasProfile:true,
      profile:{
        ...profile,
        country:"South Africa",
       
      }
    },{
      new:true
    })
 
    resp.json({
       msg:'okay',
       user,
    })
   } catch (error) {
     console.log(error.message)
      resp.json({
        msg:'not okay'
      })
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


exports.addRemoveSkills = async (req,resp) => {
  const {data} = req.body
  console.log(req.body)
  
  try {
    if(data.type === 'add') {
      const user = await  User.findByIdAndUpdate(data.userId,{$push:{
        skills: data.skill
       }},{
        new:true
      })
      return resp.status(200).json({
        msg:'okay',
        user:{
         _id: user._id,
         chatroomIds: user.chatroomIds,
         userName: user.userName,
         avatarUrl: user.avatarUrl,
         hasProfile: user.hasProfile,
         profile: user.profile,
         skills: user.skills
        }
      })
     } else if(data.type === 'remove') {
       const user = await  User.findByIdAndUpdate(data.userId,  {$pull:{
        skills: data.skill
       }},{
        new:true
      })
      console.log(user)
       return resp.status(200).json({
         msg:'okay',
         user:{
          _id: user._id,
          chatroomIds: user.chatroomIds,
          userName: user.userName,
          avatarUrl: user.avatarUrl,
          hasProfile: user.hasProfile,
          profile: user.profile,
          skills: user.skills
         }
       })
     }
  } catch (error) {
    console.log(error.message)
    return resp.json({
      msg:'something went wrong please try again later.'
    })
  }
}