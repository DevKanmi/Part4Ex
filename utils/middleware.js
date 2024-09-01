const logger = require('./logger')

const requestlogger = (request, response,next) =>{
    logger.info('Method :', request.method)
    logger.info('Path :', request.path)
    logger.info('Body : ', request.body)
    logger.info('---')
    next()
}

const unknownRoute = ( request, response, next )=>{
    response.status(404).json({error : 'url not found'})
    next()
}

const errorHandler = (request, response) =>{
    logger.error(error.name)

    if(error.name === 'Validation error'){
        response.status(400).json({error: 'Username or Password is incorrect'})
    }
}