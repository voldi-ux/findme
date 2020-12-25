const jwt =require('jsonwebtoken')

module.exports = (req,resp,next) => {
    const token =  req.query.token

    const isAuth = jwt.verify(token, 'voldi')

    if(!isAuth) return resp.redirect('signin')

    next()
}