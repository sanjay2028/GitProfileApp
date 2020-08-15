const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    login: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    name : {
        type: String,
        required: [true, "Firstname is required"],
        minelength: 2,
        maxlength: 150,
        trim:true       
    },    
    id : {
        type: Number,
        required:[true, "ID is required"],        
        unique: true,
        trim: true        
    },    
    avatar_url : {
        type: String,
        default : "useravator.png"
    },
    url : {
        type:String,
    },  
    repos_url : {
        type:String,
    },  
    user_type: {
        type: String
    },    
    avator : {
        type : String,        
    },    
    bio:{
        type: String
    },
    public_repos: {
        type: Number
    },
    registration_date: {
        type: Date
    },
    repositories: [{ type: Schema.Types.ObjectId, ref: 'Repository' }]
}, { timestamps: true });

module.exports = UserSchema;