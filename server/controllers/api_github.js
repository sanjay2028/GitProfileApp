/**
 * Author: Sanjay Kumar (sanjay2028@gmail.com)
 * Date: 15th Aug, 2020
 * Purpose: Routes for the GIT API
 */
'use strict';

const client = require('octonode').client();
const User = require('../models/user');
const Repository = require('../models/repository');
const Commit = require('../models/commit');

const _ = require('lodash');
let ghUser = null;
let current_user = null;

/**
 * Default imports
 */
const { STATUS_OK, STATUS_VALIDATION, STATUS_INTERNAL_ERROR, STATUS_NOT_FOUND, ERROR_FETCHING_USER } = require('../utilities/constants');
const { forEach } = require('lodash');
const { createError, createResponse } = require("../utilities/helpers");

 /**
  * List Repositories   
  */
const ListRepositories = async (req, res) => {

    try{
        let responseUser;
       
        /**
         * Extract the username from request parameters
         */        
        const githubusername = req.params.user;   
        ghUser = await client.user(githubusername);           
        
        current_user = await fetchByUserName(githubusername);

        if(!!!current_user){                  
            /**
             * If user not exits, Fetch details from github             
             */            
            let userInfo = await ghUser.infoAsync();        

            current_user = await createUser(userInfo.shift());
            
            current_user.repositories = "Please wait!!. Data import in progress";
            responseUser = current_user.toJSON();
            responseUser["inTransit"] = true       

            /**
             * Trigger the update for the insertion of repos and commits
             * Asynchronously
             */
            
            updateRepoInfo().then(async response => {
                /**
                 * Insert the commits for each repo
                 */
                try{
                    await insertRepoCommits(response);   
                    sendSocketReply(response)                    
                } catch(error) {
                    console.log("Error occurred while fetcing repos");
                }                

            }).catch(error => {
                console.log("Error found in async code", error)
            });
            
        } else {                        
            responseUser = current_user.toJSON()
            responseUser["inTransit"] = false            
        }                

        res.status(STATUS_OK).send(createResponse(responseUser))

    } catch(error){              
        res.status(STATUS_NOT_FOUND).send(error)
    }  
}

const sendSocketReply = (repositories) => {
    socket.emit('asyncRepos', repositories);
}

const insertRepoCommits = async(data) => {
    return await new Promise(async (resolve, reject) => {
        
        try{            
            for(let repoItem of data){                                
                let commitsJobs = [];        
                let { full_name, _id: repository } = repoItem;            
                console.log("Full Name", full_name);
                let ghRepo = await client.repo(full_name);

                try{
                    let commits = await ghRepo.commitsAsync();
                    let commitData = commits.shift();

                    if(commitData.constructor.name == 'Array'){
                        commitData.map(item => {
                            let {committer, comment_count, message} = item.commit;                        
                            commitsJobs.push({...committer, comment_count, message, repository})
                        })                    
                    }        
                    let result = await Commit.insertMany(commitsJobs, { ordered  : false });                                        
                    await repoItem.updateOne({commits : result.map(item => item._id )});                    
                    resolve(result);
                    
                } catch(error){                    
                    console.log("Error fetching the commits for %s", full_name)
                }
            }

            resolve(true);

        } catch(error) {
            console.log("Error: %s", error.toString())
            console.log("Error: %s", error)
            reject(error.toString());
        }
    })
}

const updateRepoInfo = async () => {
    return await new Promise(async (resolve, reject) => {
        
        let userRepositories = await ghUser.reposAsync();
        
        let repoData = userRepositories.shift();
        let repoJobs = []    
        if(repoData.constructor.name == 'Array'){
            for(let repoItem of repoData){                
                let {id, name, full_name, description, url, language, owner } = repoItem;
                repoJobs.push({id, name, full_name, description, url, language, owner : current_user._id }); 
            }        
        }  

        try{            
            let result = await Repository.insertMany(repoJobs, { ordered  : false });
            await current_user.updateOne({repositories : result.map(item => item._id )});
            resolve(result);
        } catch(error){
            reject(error)
        }        

    })

}

const verifyOwnership = async (login, repo) => {
    return await new Promise( async (resolve, reject) => {
        console.log("Here", login, repo)
        try{
            let result = await User.findOne({repositories: repo});
            if(!!result) resolve(result) 
            else reject(null)
        } catch(error) {
            reject(null)
        }

    })
}

/**
  * Get commits listing of an repository
  */
 const getCommitsByRepositoryID = async (req, res) => {
     try{

        const login = req.params.user;
        const repo = req.params.repo;
        
        try{
            await verifyOwnership(login, repo);
            let data = await Commit.find({repository : repo});        
            res.status(STATUS_OK).send(createResponse(data))
        } catch(error) {
            throw {code : "invalid_access", message : "Record not found" };
        }        
        
     } catch(error){               
        res.status(STATUS_OK).send(createError(500, error));
     }    
}

const fetchByUserName = async (login) => {
    return await new Promise(async (resolve, reject) => {                
        try{            
            let user = await User.findOne({login}).populate("repositories");            
            return resolve(user);
        } catch(error){
            return reject(ERROR_FETCHING_USER);
        }   
    })

}

const createUser = async (user) => {
    return await new Promise(async (resolve, reject) => {

        const { login, id, avatar_url, url, repos_url, type:user_type, name, email, bio, public_repos, created_at:registration_date } = user;

        try{
            const user = new User({ login, id, avatar_url, url, repos_url, type:user_type, name, email, bio, public_repos, created_at:registration_date });
            await user.save();
            resolve(user);
        } catch(error){
            console.log("Errow while savign user", error);
            reject("Error while saving the user")
        }
    })
}

module.exports = {
    ListRepositories, getCommitsByRepositoryID
}