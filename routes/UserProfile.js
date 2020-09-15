const express = require('express')
const router = express.Router()
const {  getUserProfile,getProfiles,getfilteredProfiles } = require('../controllers/userProfile')

//post routes

router.get('/getuserprofile/:userId',getUserProfile)
//get routes
router.get('/getProfiles/:pageItems/:pageNum',getProfiles)
router.get('/getfilteredProfiles/:pageItems/:pageNum',getfilteredProfiles)


module.exports = router