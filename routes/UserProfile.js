const express = require('express')
const router = express.Router()
const {  getUserProfile,getProfiles,postProfile,getfilteredProfiles } = require('../controllers/userProfile')

//post routes

router.get('/getuserprofile/:userId',getUserProfile)
//get routes
router.get('/getProfiles/:pageItems/:pageNum',getProfiles)
router.post('/getfilteredProfiles/:pageItems/:pageNum',getfilteredProfiles)
router.post('/postprofile',postProfile)


module.exports = router