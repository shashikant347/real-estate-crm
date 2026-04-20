const mongoose = require("mongoose");

const leadSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: String,
  budget: Number,
  status: {
    type: String,
    enum: ["new", "contacted", "qualified", "closed", "lost"],
    default: "new"
  },
  followUpDate: Date,
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
}, { timestamps: true });

module.exports = mongoose.model("Lead", leadSchema);