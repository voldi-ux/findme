const express = require('express')
const router = express.Router()
const {  getUserProfile,getProfiles,postProfile,getfilteredProfiles, updateProfile } = require('../controllers/userProfile')

//post routes

router.get('/getuserprofile/:userId',getUserProfile)
//get routes
router.get('/getProfiles/:pageItems/:pageNum',getProfiles)

router.post('/getfilteredProfiles',getfilteredProfiles)
router.post('/postprofile',postProfile)
router.post('/update-profile',updateProfile)

module.exports = router