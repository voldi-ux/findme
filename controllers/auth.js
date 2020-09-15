const sendGrid =require('@sendgrid/mail')
const crypto = require('crypto')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const Profile = require('../models/profile')



const api_key ='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'

sendGrid.setApiKey(api_key)

//should handle errors latter on
exports.postSigningUp = async (req,resp,next) => {
  return  crypto.randomBytes(42, (err,buffer) => {
        const token = buffer.toString('hex')
        
    const {name,email} = req.body;
    try {
       sendGrid.send({
           to: email,
           from: "voldimuyumba2001@gmail.com",
           subject: "verify email ",
           html: `<p> to very your email please click <a href="http://localhost:5000/getcredentials/?uva=${token}name=${name}&& email=${email}"> here</a> </p>`,
         })
       
         return resp.redirect('/emailverification')
    } catch (error) {
        console.log(error)
    }
    })
}


exports.postSignin  = async(req,resp,next) => {
   
    const {password,email} = req.body

   try {
       
 const user = await  User.findOne({
    email:email
}).exec()

if(!user) {
//    logic for email not found
   throw new Error(' a user a with that email does not exists')
}
const match =  await bcrypt.compare(password,user.password )

if(!match) throw Error('password do not match');
const token = jwt.sign({
 userId:user._id.toString()
},'voldi', {expiresIn: '4hr'})

return  resp.status(201).json({
    type:'success',
    user:user._doc,
    userId:user._id.toString(),
    token: token,
    message:'logged in successful'
})

   } catch (error) {
       return resp.json({
           type:'error',
           message:error.message
       })
   }
}


//get the user passwords
exports.postCredentials = async(req,resp,next) => {
    const {password,confirmPassword,hidden} = req.body

    // extract data from the hidden field i.e UserName and email

    let  name = hidden.split('?')[1].split('&&')[1].split("=")[1]
    let  email = hidden.split('?')[1].split('&&')[2].split("=")[1]
await    console.log(name,email)
    const hashedPassword = await bcrypt.hash(password, 12)
     const user = await new User({
         userName:name,
         email:email,
         password:hashedPassword,
     })
 
     let createdUser =  await user.save() 
//      const profile = new Profile({
//         name:'Naruto',
//         surname:'Ndidi',
//         avatarUrl:'https://static.toiimg.com/photo/76729750.cms',
//         currentLocation:'hillbrow',
//         country:'SA',
//         town:'BOSTON',
//         age:56,
//         bio: 'In friendship diminution instrument so. Son sure paid door with say them. Two among sir sorry men court. Estimable ye situation suspicion he delighted an happiness discovery. Fact are size cold why had part. If believing or sweetness otherwise in we forfeited. Tolerably an unwilling arranging of determine. Beyond rather sooner so if up wishes or.',
//         gallary:['https://loremflickr.com/g/320/240/man','https://loremflickr.com/g/320/240/boy','https://loremflickr.com/g/320/240/girl/all','https://loremflickr.com/g/320/240/woman','https://loremflickr.com/g/320/240/boy,family','https://loremflickr.com/g/320/240/child'],
//         userId: createdUser._id,
//  })

//  await profile.save()
    const token = jwt.sign({
        userId:createdUser._id.toString()
    },'voldi', {expiresIn: '4hr'})
        
      return  resp.redirect('/signin')
}



