const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommitSchema = new Schema({    
    message: { type: String, required: true},
    name: { type: String, required: true },
    email: { type: String, required: true, },
    date: { type: Date, },
    comment_count: { type: Number },    
    repository : {
        type: Schema.ObjectId,
        ref: 'Repository',
        required:true,
    },    
});

module.exports = CommitSchema;