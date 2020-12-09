const express = require('express')
const router = express.Router()
const {getByUserId,getChats,getRoom,getRoomsMobile} = require('../controllers/chat')

//post routes
router.get('/getuserbyId/:userId',getByUserId)
router.get('/getroom/:userId1/:userId2',getRoom)
router.get('/getchats/:userId',getChats)

//get routes
// router.get('/userdatarecieved',getCredentials)

//mobile routes 
router.get('/getRoomsMobile/:userId',getRoomsMobile)
module.exports = router