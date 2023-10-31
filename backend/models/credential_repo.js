const mongoose = require('mongoose');

const credentialRepoSchema = new mongoose.Schema({
    name: { type: String, required: true },
    credentials: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Credential' }]
  });

module.exports = mongoose.model('CredentialRepo', credentialRepoSchema);
