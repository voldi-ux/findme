const express = require('express')
const router = express.Router()
const {postSignin,postSigningUp,postCredentials} = require('../controllers/auth')
const {  getUserProfile,getProfiles } = require('../controllers/userProfile')

//post routes

router.get('/getuserprofile/:userId',getUserProfile)
//get routes
router.get('/getProfiles/:pageItems/:pageNum',getProfiles)


module.exports = router