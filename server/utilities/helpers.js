const { STATUS_OK } = require('./constants')


const createResponse = (data) => ({
    success : true,
    status_code : STATUS_OK,
    data  
})

const createError = (status_code, data) => ({
    success : false,
    status_code,
    data,
})

module.exports = { createError, createResponse }