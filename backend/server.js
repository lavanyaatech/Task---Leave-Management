const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Leave = require("./models/Leave");

const app = express();
app.use(cors());
app.use(express.json());

// ✅ MongoDB Connection (replace <db_password> with your real password)
mongoose.connect("mongodb+srv://admin:admin@cluster0.whmcfzt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ MongoDB Error:", err.message));

// 🟢 Apply for Leave
app.post("/api/leave/apply", async (req, res) => {
  try {
    const { userId, startDate, endDate, reason } = req.body;
    if (!userId || !startDate || !endDate || !reason) {
      return res.status(400).json({ success: false, error: "All fields are required" });
    }

    const leave = new Leave({ userId, startDate, endDate, reason });
    await leave.save();
    res.json({ success: true, message: "Leave applied successfully", leave });
  } catch (err) {
    console.error("❌ Apply Leave Error:", err.message);
    res.status(500).json({ success: false, error: "Server error" });
  }
});

// 🟢 Fetch User's Leaves
app.get("/api/leave/mine/:userId", async (req, res) => {
  try {
    const leaves = await Leave.find({ userId: req.params.userId }).sort({ startDate: -1 });
    res.json({ success: true, leaves });
  } catch (err) {
    console.error("❌ Fetch Leaves Error:", err.message);
    res.status(500).json({ success: false, error: "Server error", leaves: [] });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
