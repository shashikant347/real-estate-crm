const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  preferences: String,
  sourceLead: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Lead"
  }
}, { timestamps: true });

module.exports = mongoose.model("Client", clientSchema);