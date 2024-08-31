const bcrypt = require('bcrypt')
const User = require('../models/signUpSchema')
const signUpRouter = require('express').Router()

const createSignUp =  async(request,response) =>{
    try{
    const {username, name, password} = request.body  //Destructuring from the body of request

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password,saltRounds) //Hashing of passwords

    const user = new User({
        username,
        name,
        passwordHash
    })

    const savedUser = await user.save()
    response.status(201).json(savedUser)
} 
    catch(error) {  //Returns error if validation fails
        if(error.name === 'ValidationError'){
            response.status(400).json({error:'Min length required'})
        }
    }
}

//Return all Users in the database
const getSavedUsers = async(request, response)=>{
    const users = await User.find({})  
    response.status(200).json(users)
}

signUpRouter.post('/',createSignUp)
signUpRouter.get('/', getSavedUsers)

module.exports = signUpRouter