const confrc = require("rc")("moments", {});
const User = require('../Models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.signUpUser = async (req,res) => {
    try {
        const {name,email,city,password} = req.body
        if(!name || !email || !city || !password){
            return res.status(400).json({error : 'required data missing'})
        }
        const isUserExists = await User.findOne({email})
        if(isUserExists) {
            return res.status(400).json({error : 'user_exists'})
        }

        const hashedPasswrod = await bcrypt.hash(password, 10)

        const user = new User({
            name,email,city,password:hashedPasswrod
        })
        await user.save()
        res.json({success : true, user})
    } catch (error) {
        console.error(error)
        res.status(500).json({error})
    }
}

exports.signIn = async(req,res) => {
    try {
        const {email,password} = req.body

        const user = await User.findOne({email})
        if(!user) return res.status(400).json({error: 'user_not_found'})
        if(await bcrypt.compare(password, user.password)) {
            const token = jwt.sign(user.email, confrc.ACCESS_TOKEN_SECRET)
            res.json({token})
        }else res.status(400).json({error : 'wrong_password'})

    } catch (error) {
        console.error(error)
        res.status(500).json({error})
    }
}

exports.getUser = async(req,res) => {
    try {
        res.json({user:req.user})
    } catch (error) {
        res.status(500)
    }
}