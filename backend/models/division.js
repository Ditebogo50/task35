const mongoose = require('mongoose');

const divisionSchema = new mongoose.Schema({
    name: { type: String, required: true },
    credentialRepo: [{ type: mongoose.Schema.Types.ObjectId, ref: 'CredentialRepo' }]
  });

  module.exports = mongoose.model('Division', divisionSchema);
