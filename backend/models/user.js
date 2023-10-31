const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['normal', 'management', 'admin'], default: 'normal' },
    oUs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'OU' }],
    divisions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Division' }]
  });

  module.exports = mongoose.model('User', userSchema);
