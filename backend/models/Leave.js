const mongoose = require("mongoose");

const LeaveSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  reason: { type: String, required: true },
  status: { type: String, default: "Pending" } // Optional: Pending/Approved/Rejected
}, { timestamps: true });

module.exports = mongoose.model("Leave", LeaveSchema);
