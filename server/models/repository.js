const mongoose = require('mongoose');
const RepositorySchema = require('./schemas/repoSchema');


// UserSchema.statics.findByGitId = async (login) => {    
//     return await new Promise(async (resolve, reject) => {        
//         let User = this;        
//         try{
//             console.log("11")
//             let user = User.findOne({login}).exec();
//             console.log("2")
//             resolve(user);
//         } catch(error){
//             reject(ERROR_FETCHING_USER);
//         }   
//     })

// }


const Repository = mongoose.model('Repository', RepositorySchema);

module.exports = Repository;