const express = require('express')
const router = express.Router()
const {  getUserProfile,getProfiles,postProfile,getfilteredProfiles, updateProfile,getProfilesMobile,Search, addRemoveSkills } = require('../controllers/userProfile')


router.get('/getuserprofile/:userId',getUserProfile)
//get routes
router.get('/getProfiles/:pageItems',getProfiles)
router.get('/search/:searchString',Search)


//post routes
router.post('/addRemoveSkills',addRemoveSkills)
router.post('/getfilteredProfiles',getfilteredProfiles)
router.post('/postprofile',postProfile)
router.post('/update-profile',updateProfile)

//mobile routes 
router.get('/getProfilesMobile/:itemsCount',getProfilesMobile)


module.exports = router