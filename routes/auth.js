const express = require('express')
const router = express.Router()
const {postSignin,postSigningUp,getCredentials,postCredentials} = require('../controllers/auth')

//post routes
router.post('/signingup',postSigningUp)
router.post('/credentials',postCredentials )
router.put('/signin',postSignin)
router.get('/getprofile')
//get routes
// router.get('/userdatarecieved',getCredentials)


module.exports = router