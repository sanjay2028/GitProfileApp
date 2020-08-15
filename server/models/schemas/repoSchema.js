const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RepositorySchema = new Schema({    
    id: {
        type: Number,
        required: true        
    },
    name: {
        type: String,
        required: true
    },
    full_name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    url: {
        type: String
    },
    language : {
        type: String
    },
    owner : {
        type: Schema.ObjectId,
        ref: 'User',
        required:true,
    },
    commits : [{
        type: Schema.ObjectId,
        ref: 'Commit',
        required:true,
    }],    
});

module.exports = RepositorySchema;