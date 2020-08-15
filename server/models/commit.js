const mongoose = require('mongoose');
const CommitSchema = require('./schemas/commitSchema');
const Commit = mongoose.model('Commit', CommitSchema);

module.exports = Commit;