const express = require('express')
const router = express.Router()
const {postSignin,postSigningUp,getCredentials,postCredentials,signUp} = require('../controllers/auth')

//post routes
router.post('/signingup',postSigningUp)
router.post('/signUp',signUp )
router.put('/signin',postSignin)
router.get('/getprofile')
//get routes
// router.get('/userdatarecieved',getCredentials)


module.exports = router