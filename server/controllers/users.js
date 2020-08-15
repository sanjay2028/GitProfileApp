/**
 * Author: Sanjay Kumar (sanjay2028@gmail.com)
 * Date: 15th Aug, 2020
 * Purpose: Routes for the GIT API
 */
'use strict';

/**
 * Default imports
 */
const { STATUS_OK, STATUS_VALIDATION, STATUS_INTERNAL_ERROR } = require('../utilities/constants');

/**
  * List Users   
  */
 const ListRepositories = (req, res) => {    
     console.log(req.params.user)
    res.status(STATUS_OK).send("This API will list all the users in the database")
}