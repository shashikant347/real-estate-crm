const mongoose = require("mongoose");

const dealSchema = new mongoose.Schema({
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Client"
  },
  propertyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Property"
  },
  amount: Number,
  commission: Number,
  status: {
    type: String,
    enum: ["negotiation", "agreement", "closed"],
    default: "negotiation"
  }
}, { timestamps: true });

module.exports = mongoose.model("Deal", dealSchema);