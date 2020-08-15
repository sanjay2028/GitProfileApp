const mongoose = require('mongoose');
const UserSchema = require('./schemas/userSchema');
const {ERROR_FETCHING_USER, AVATOR_DIR_URL} = require('../utilities/constants');
// const config = require('config');
// const avatorDirectory = config.get("http_avators");

//Encrypt password at the time of registration

UserSchema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject();
    if(!!userObject.avator){
        userObject.avator = `${AVATOR_DIR_URL}/default/${DEFAULT_AVATOR}`;
    }
    
    delete userObject.__v;

    return userObject
}


UserSchema.statics.findByGitId = async (login) => {    
    return await new Promise(async (resolve, reject) => {        
        let User = this;        
        try{            
            let user = User.findOne({login}).exec();            
            resolve(user);
        } catch(error){
            reject(ERROR_FETCHING_USER);
        }   
    })

}


const User = mongoose.model('User', UserSchema);

module.exports = User;