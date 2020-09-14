const sendGrid =require('@sendgrid/mail')
const crypto = require('crypto')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const Profile = require('../models/profile')

const { profile, error } = require('console')

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
})

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



const USERS = [
    {
        id:1,
        name:'voldi',
        surname:'muyumba',
        avatarUrl:'https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png',
        currentLocation:'hillbrow',
        country:'SA',
        town:'JHB',
        age:26,
        bio: 'In friendship diminution instrument so. Son sure paid door with say them. Two among sir sorry men court. Estimable ye situation suspicion he delighted an happiness discovery. Fact are size cold why had part. If believing or sweetness otherwise in we forfeited. Tolerably an unwilling arranging of determine. Beyond rather sooner so if up wishes or.',
        gallary:['https://loremflickr.com/g/320/240/man','https://loremflickr.com/g/320/240/boy','https://loremflickr.com/g/320/240/girl/all','https://loremflickr.com/g/320/240/woman','https://loremflickr.com/g/320/240/boy,family','https://loremflickr.com/g/320/240/child']
    }
    ,
    {
        id:2,
        name:'merry',
        surname:'george',
        avatarUrl:'https://images.vexels.com/media/users/3/145908/preview2/52eabf633ca6414e60a7677b0b917d92-male-avatar-maker.jpg',
        currentLocation:'Berea',
        country:'USA',
        town:'JHB',
        age:56,
        bio: 'In friendship diminution instrument so. Son sure paid door with say them. Two among sir sorry men court. Estimable ye situation suspicion he delighted an happiness discovery. Fact are size cold why had part. If believing or sweetness otherwise in we forfeited. Tolerably an unwilling arranging of determine. Beyond rather sooner so if up wishes or.',
        gallary:['https://loremflickr.com/g/320/240/man','https://loremflickr.com/g/320/240/boy','https://loremflickr.com/g/320/240/girl/all','https://loremflickr.com/g/320/240/woman','https://loremflickr.com/g/320/240/boy,family','https://loremflickr.com/g/320/240/child']
    }
    ,
    {
        id:3,
        name:'Vee',
        surname:'Long',
        avatarUrl:'https://cdn2.f-cdn.com/contestentries/1316431/24595406/5ae8a3f2e4e98_thumb900.jpg',
        currentLocation:'Yeovile',
        country:'South Africa',
        town:'JHB',
        age:23,
        bio: 'In friendship diminution instrument so. Son sure paid door with say them. Two among sir sorry men court. Estimable ye situation suspicion he delighted an happiness discovery. Fact are size cold why had part. If believing or sweetness otherwise in we forfeited. Tolerably an unwilling arranging of determine. Beyond rather sooner so if up wishes or.',
        gallary:['https://loremflickr.com/g/320/240/man','https://loremflickr.com/g/320/240/boy','https://loremflickr.com/g/320/240/girl/all','https://loremflickr.com/g/320/240/woman','https://loremflickr.com/g/320/240/boy,family','https://loremflickr.com/g/320/240/child']
    }
    ,
    {
        id:4,
        name:'John',
        surname:'muyumba',
        avatarUrl:'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRiTTvM-OxXDfUbOGElUVQqf00GEvUl6qOAcOi8tVlwJw&usqp=CAU&ec=45699843',
        currentLocation:'park T',
        country:'SA',
        town:'Durban',
        age:33,
        bio: 'In friendship diminution instrument so. Son sure paid door with say them. Two among sir sorry men court. Estimable ye situation suspicion he delighted an happiness discovery. Fact are size cold why had part. If believing or sweetness otherwise in we forfeited. Tolerably an unwilling arranging of determine. Beyond rather sooner so if up wishes or.',
        gallary:['https://loremflickr.com/g/320/240/man','https://loremflickr.com/g/320/240/boy','https://loremflickr.com/g/320/240/girl/all','https://loremflickr.com/g/320/240/woman','https://loremflickr.com/g/320/240/boy,family','https://loremflickr.com/g/320/240/child']
    }
    ,
    {
        id:5,
        name:'Naruto',
        surname:'Ndidi',
        avatarUrl:'https://static.toiimg.com/photo/76729750.cms',
        currentLocation:'hillbrow',
        country:'SA',
        town:'BOSTON',
        age:56,
        bio: 'In friendship diminution instrument so. Son sure paid door with say them. Two among sir sorry men court. Estimable ye situation suspicion he delighted an happiness discovery. Fact are size cold why had part. If believing or sweetness otherwise in we forfeited. Tolerably an unwilling arranging of determine. Beyond rather sooner so if up wishes or.',
        gallary:['https://loremflickr.com/g/320/240/man','https://loremflickr.com/g/320/240/boy','https://loremflickr.com/g/320/240/girl/all','https://loremflickr.com/g/320/240/woman','https://loremflickr.com/g/320/240/boy,family','https://loremflickr.com/g/320/240/child']
    }
    ,
    {
        id:6,
        name:'patrick123',
        surname:'Oja',
        avatarUrl:'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSq_I0JFO2DxoAV3J-sI7ajtx0qW0Q5neaY_A&usqp=CAU',
        currentLocation:'Madi',
        country:'Mali',
        town:'Bali',
        age:18,
        bio: 'In friendship diminution instrument so. Son sure paid door with say them. Two among sir sorry men court. Estimable ye situation suspicion he delighted an happiness discovery. Fact are size cold why had part. If believing or sweetness otherwise in we forfeited. Tolerably an unwilling arranging of determine. Beyond rather sooner so if up wishes or.',
        gallary:['https://loremflickr.com/g/320/240/man','https://loremflickr.com/g/320/240/boy','https://loremflickr.com/g/320/240/girl/all','https://loremflickr.com/g/320/240/woman','https://loremflickr.com/g/320/240/boy,family','https://loremflickr.com/g/320/240/child']
    }
    ,
    {
        id:7,
        name:'BEN',
        surname:'KOON',
        avatarUrl:'https://cdn.iconscout.com/icon/free/png-256/avatar-367-456319.png',
        currentLocation:'mexico ',
        country:'Mexico',
        town:'San Diago',
        age:21,
        bio: 'In friendship diminution instrument so. Son sure paid door with say them. Two among sir sorry men court. Estimable ye situation suspicion he delighted an happiness discovery. Fact are size cold why had part. If believing or sweetness otherwise in we forfeited. Tolerably an unwilling arranging of determine. Beyond rather sooner so if up wishes or.',
        gallary:['https://loremflickr.com/g/320/240/man','https://loremflickr.com/g/320/240/boy','https://loremflickr.com/g/320/240/girl/all','https://loremflickr.com/g/320/240/woman','https://loremflickr.com/g/320/240/boy,family','https://loremflickr.com/g/320/240/child']
    }
    ,
    {
        id:8,
        name:'Dan',
        surname:'Mpho',
        avatarUrl:'https://cdn.iconscout.com/icon/free/png-256/avatar-380-456332.png',
        currentLocation:'hillbrow',
        country:'SA',
        town:'JHB',
        age:44,
        bio: 'In friendship diminution instrument so. Son sure paid door with say them. Two among sir sorry men court. Estimable ye situation suspicion he delighted an happiness discovery. Fact are size cold why had part. If believing or sweetness otherwise in we forfeited. Tolerably an unwilling arranging of determine. Beyond rather sooner so if up wishes or.',
        gallary:['https://loremflickr.com/g/320/240/man','https://loremflickr.com/g/320/240/boy','https://loremflickr.com/g/320/240/girl/all','https://loremflickr.com/g/320/240/woman','https://loremflickr.com/g/320/240/boy,family','https://loremflickr.com/g/320/240/child']
    }
    ,
    {
        id:9,
        name:'Henrry',
        surname:'key',
        avatarUrl:'https://www.w3schools.com/w3images/avatar2.png',
        currentLocation:'Lumba',
        country:'DRC',
        town:'Lububanshi',
        age:16,
        bio: 'In friendship diminution instrument so. Son sure paid door with say them. Two among sir sorry men court. Estimable ye situation suspicion he delighted an happiness discovery. Fact are size cold why had part. If believing or sweetness otherwise in we forfeited. Tolerably an unwilling arranging of determine. Beyond rather sooner so if up wishes or.',
        gallary:['https://loremflickr.com/g/320/240/man','https://loremflickr.com/g/320/240/boy','https://loremflickr.com/g/320/240/girl/all','https://loremflickr.com/g/320/240/woman','https://loremflickr.com/g/320/240/boy,family','https://loremflickr.com/g/320/240/child']
    }
    ,
    {
        id:10,
        name:'Lauren',
        surname:'Mdushi',
        avatarUrl:'https://www.pngarts.com/files/6/User-Avatar-in-Suit-PNG.png',
        currentLocation:'hillbrow',
        country:'SA',
        town:'JHB',
        age:28,
        bio: 'In friendship diminution instrument so. Son sure paid door with say them. Two among sir sorry men court. Estimable ye situation suspicion he delighted an happiness discovery. Fact are size cold why had part. If believing or sweetness otherwise in we forfeited. Tolerably an unwilling arranging of determine. Beyond rather sooner so if up wishes or.',
        gallary:['https://loremflickr.com/g/320/240/man','https://loremflickr.com/g/320/240/boy','https://loremflickr.com/g/320/240/girl/all','https://loremflickr.com/g/320/240/woman','https://loremflickr.com/g/320/240/boy,family','https://loremflickr.com/g/320/240/child']
    }
]

// try {
    
//     USERS.forEach(element => {
//         let  user = new Profile(element)
//         user.save()
//     });
// } catch (error) {
//     console.log(error)
// }