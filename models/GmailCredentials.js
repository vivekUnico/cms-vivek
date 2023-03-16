const mongoose = require("mongoose");
const gamilcreadentialsScheme = new mongoose.Schema({
  ACCESS_TOKEN: {
    type: String,
    required: true,
  },
  REFRESH_TOKEN: {
    type: String,
    required: true,
  },
  gmailCode: {
    type: String,
    required: true,
  },
  mailIdList: {
    type: Array,
    default: [],
  }
}, { timestamps: true });

module.exports = mongoose.model("GmailCredentials", gamilcreadentialsScheme);