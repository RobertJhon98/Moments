const jwt = require("jsonwebtoken")
const confrc = require("rc")("moments", {});
const User = require('../Models/User')

exports.authUser = async(req,res,next) => {
    try {
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]
        if(!token) return res.status(401).json({error: 'no auth'})

        jwt.verify(token, confrc.ACCESS_TOKEN_SECRET, async (error, email) => {
            if(error) return res.status(403).json({error : 'invalid token'})
            const user = await User.findOne({email:email})
            if(!user) return res.status(403).json({error : 'user not found'})
            req.user = user
            next()
        })
    } catch (error) {
        res.status(500)
    }
}