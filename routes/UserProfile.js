const express = require('express')
const router = express.Router()
const {postSignin,postSigningUp,getCredentials,postCredentials} = require('../controllers/auth')
const {  getUserProfile } = require('../controllers/userProfile')

//post routes

router.get('/getuserprofile/:userId',getUserProfile)
//get routes
// router.get('/userdatarecieved',getCredentials)


module.exports = router