const bcrypt = require('bcrypt')
const User = require('../models/signUpSchema')
const signUpRouter = require('express').Router()

const createSignUp =  async(request,response) =>{
    const {username, name, password} = request.body

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password,saltRounds)

    const user = new User({
        username,
        name,
        passwordHash
    })

    const savedUser = await user.save()
    response.status(201).json(savedUser)
}

const getSavedUsers = async(request, response)=>{
    const users = await User.find({})
    response.status(200).json(users)
}

signUpRouter.post('/',createSignUp)
signUpRouter.get('/', getSavedUsers)

module.exports = signUpRouter