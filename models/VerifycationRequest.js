const mongoose = require('mongoose');
const { Schema } = mongoose;

const VerificationRequestSchema = new Schema({
  id: { type: String, required: true, default: () => mongoose.Types.ObjectId().toString() },
  identifier: { type: String, required: true },
  token: { type: String, required: true, unique: true },
  expires: { type: Date, required: true },
  createdAt: { type: Date, required: true, default: Date.now },
  updatedAt: { type: Date, required: true, default: Date.now },
});

VerificationRequestSchema.index({ identifier: 1, token: 1 }, { unique: true });

const VerificationRequest = mongoose.model('VerificationRequest', VerificationRequestSchema);

module.exports = VerificationRequest;