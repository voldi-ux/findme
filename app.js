const express  = require('express')
const mongoose = require('mongoose')
const path = require('path')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
const authRoutes = require('./routes/auth')

const MONGO_URI = ' mongodb://127.0.0.1:27017/findme'

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(cors())


app.use(authRoutes)

app.use(express.static(path.join(__dirname, 'client' , 'build')))

app.use('*', (req, resp ) => resp.sendFile(path.join(__dirname, 'client', 'build', 'index.html')) )




app.listen(5000, () => console.log('app listening'))