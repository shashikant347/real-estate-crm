const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema({
  title: String,
  price: Number,
  location: String,
  size: String,
  amenities: [String],
  images: [String],
  status: {
    type: String,
    enum: ["available", "sold"],
    default: "available"
  },
  agentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
});

module.exports = mongoose.model("Property", propertySchema);