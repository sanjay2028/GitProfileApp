/**
 * Author: Sanjay Kumar (Sanjay2028@gmail.com)
 * Date: 15th Aug, 2020
 * Purpose: Create a connetion with mongoose
 */
    
'use strict';

const mongoose = require('mongoose');
const {DB_CONNECTION_SUCCESS, DB_CONNECTION_FAILED} = require('./constants');


/**
 * Configuration as per Mongoose documentation
 */
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

/**
 * Establish the connection with mongoose server
 */

 module.exports = async() => {
    return await new Promise(async (resolve, reject) => {
        try{
            await mongoose.connect(process.env.DB_URL, {useNewUrlParser: true, useUnifiedTopology:true})
            resolve(DB_CONNECTION_SUCCESS);
        } catch(error) {
            reject(DB_CONNECTION_FAILED, error)
        }
    })
 }


 