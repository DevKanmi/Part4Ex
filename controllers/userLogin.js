const loginRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User  = require('../models/signUpSchema')
const { response } = require('../app')
const { error } = require('../utils/logger')


const post = async(request, response) =>{
    const {username, password} = request.body

    const user = await User.findOne({username})

    const passwordCorrect = user === null ? false : await bcrypt.compare(password,user.passwordHash)

    if(!(user && passwordCorrect)){
        return response.status(400).json({error: 'Invalid Username or Password'})
    }

    const tokenForUser ={
        username : user.username,
        id: user._id
    }

    const token = jwt.sign(tokenForUser, process.env.SECRET)

    response.status(200).send({token , username:user.username, name: user.name})

}


loginRouter.post('/', post)

module.exports = loginRouter