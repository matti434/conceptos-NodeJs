// entiendo que dotenv es obsoleto pero igual lo veo para tender la forma mas vieja
require('dotenv').config(); 
const {get} = require('env-var')

const envs = {
    PORT : get('PORT').required().asPortNumber(), // asPortNumber para que lo identifique como un puerto valido
    PUBLIC_PATH: get('PUBLIC_PATH').default('public').asString()    
}

module.exports = {
    envs
}