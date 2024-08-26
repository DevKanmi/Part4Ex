require('dotenv').config()

const PORT = process.env.PORT
const MONGODB_URI = process.env.NODE_ENV === 'test' ? TEST_MONGODB_URI : MONGODB_URI

module.exports ={
    PORT,
    MONGODB_URI,

}