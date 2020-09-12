const sendGrid =require('@sendgrid/mail')
const crypto = require('crypto')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
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


 const user = await  User.findOne({
       email:email
   })

   if(!user) {
//    logic for email not found
      throw error
   }
   const match =  await bcrypt.compare(password,user.password )

   if(!match) throw error;
   
 return  resp.json({
       user: user,
       message:'logged in successful'
   })

}


//get the user passwords
exports.postCredentials = async(req,resp,next) => {
    const {password,confirmPassword,hidden} = req.body

    // extract data from the hidden field i.e UserName and email

    let  name = hidden.split('?')[1].split('&&')[1].split("=")[1]
    let  email = hidden.split('?')[1].split('&&')[2].split("=")[1]
await    console.log(name,email)
    const hashedPassword = await bcrypt.hash(password, 12)
     const user = new User({
         name:name,
         email:email,
         password:hashedPassword,
         profile: {}
     })
    const token = jwt.sign({
        userId:user_id.toString()
    },'voldi', {expiresIn: '4hr'})
      await user.save()    
    return  resp.status(2001).json({
      token:token,
      message:'sign in successful'
 })
}

