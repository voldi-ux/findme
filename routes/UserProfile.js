const express = require('express')
const router = express.Router()
const {  getUserProfile,getProfiles,postProfile,getfilteredProfiles, updateProfile,getProfilesMobile } = require('../controllers/userProfile')

//post routes

router.get('/getuserprofile/:userId',getUserProfile)
//get routes
router.get('/getProfiles/:pageItems',getProfiles)


router.post('/getfilteredProfiles',getfilteredProfiles)
router.post('/postprofile',postProfile)
router.post('/update-profile',updateProfile)

//mobile routes 
router.get('/getProfilesMobile/:itemsCount',getProfilesMobile)


module.exports = router