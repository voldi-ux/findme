const express  = require('express')
const mongoose = require('mongoose')
const path = require('path')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
const authRoutes = require('./routes/auth')
const ProfileRoutes = require('./routes/UserProfile')

const MONGO_URI = ' mongodb://127.0.0.1:27017/findme'

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(cors())


app.use(ProfileRoutes)
app.use(authRoutes)

app.use(express.static(path.join(__dirname, 'client' , 'build')))

app.use('*', (req, resp ) => resp.sendFile(path.join(__dirname, 'client', 'build', 'index.html')) )



mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    app.listen(5000, () => console.log('app listening'))
})