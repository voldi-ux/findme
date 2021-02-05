const express = require('express')
const router = express.Router()
const {getByUserId,getChats,getRoom,getRoomsMobile,getMessages} = require('../controllers/chat')

//get routes
router.get('/getuserbyId/:userId',getByUserId)
router.get('/getroom/:userId1/:userId2',getRoom)
router.get('/getchats/:userId',getChats)
router.get('/messages/:roomId',getMessages)
module.exports = router