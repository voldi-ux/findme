const { findOneAndUpdate } = require("../models/profile");
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
      .limit(+pageItems).populate('userId').exec();
    resp.json({
      profiles: profiles,
    });
  } catch (error) {
    console.log(error);
  }
};

//constructor function

function FilterObj(name, country, town, gender,name,surname) {
  name ? (this.name = name) : null;
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
  const { name, country, town, gender,surname } = req.body;

  const filterObj = new FilterObj(name, country, town, gender,name,surname);
  const filter = isEmpty(filterObj) ? null : filterObj

  
  try {
    const profiles = await Profile.find({
      $or: [
        {name:name}, {$or: [{surname:surname || 'not vallid'},{surname:name || 'not vallid'}] }, {country:country || 'not vallid'},{gender:gender || 'not vallid'}, {town:town || 'not vallid'},
      ]
    }).populate('userId').exec()
  
    console.log(profiles)

    return resp.json({
      message: "success",
      profiles: profiles,
    });
  } catch (error) {
    console.log(error.message);
  }
};


exports.postProfile = async (req,resp,next) =>  {
   try {
    const imagesPath = req.files['gallaries'].map(image => image.filename )
    const profile= await new Profile({
      ...req.body,
      gallary: imagesPath,
      avatarUrl:'https://dmrmechanical.com/wp-content/uploads/2018/01/avatar-1577909_640.png'
    })
    // await findOneAndUpdate({_id: req.body.userId}, {hasProfile:true})
    await  profile.save()
     return resp.redirect('/home')
   }
   catch (err){
     console.log(err)
   }
}