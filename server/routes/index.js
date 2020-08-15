/**
 * Author: Sanjay Kumar (sanjay2028@gmail.com)
 * Date: 15th Aug, 2020
 * Purpose: register the routes for the api
 */

 
const express = require('express');
const router = express.Router();

const { ListRepositories, getCommitsByRepositoryID } = require('../controllers/api_github');


/**
 * List all repositories
 */
router.get('/:user', ListRepositories);

/**
 * Get repository commits by Repository Id
 */
router.get('/:user/:repo', getCommitsByRepositoryID);

module.exports = router