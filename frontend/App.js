import React, { useState, useEffect } from "react";
import { applyLeave, getMyLeaves } from "./api";

function App() {
  const [form, setForm] = useState({ startDate: "", endDate: "", reason: "" });
  const [leaves, setLeaves] = useState([]);
  const userId = "user123"; // Dummy logged-in user

  useEffect(() => {
    loadLeaves();
  }, []);

  const loadLeaves = async () => {
    const data = await getMyLeaves(userId);
    console.log("Fetched:", data); // debug
    if (data.success && Array.isArray(data.leaves)) {
      setLeaves(data.leaves);
    } else {
      setLeaves([]); // fallback if response unexpected
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await applyLeave({ ...form, userId });
    if (res.success) {
      setForm({ startDate: "", endDate: "", reason: "" });
      loadLeaves();
    } else {
      alert("Error: " + res.error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Leave Management App</h2>

      {/* Form */}
      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <input
          type="date"
          name="startDate"
          value={form.startDate}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="endDate"
          value={form.endDate}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="reason"
          placeholder="Reason"
          value={form.reason}
          onChange={handleChange}
          required
        />
        <button type="submit">Apply Leave</button>
      </form>

      {/* Table */}
      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Start</th>
            <th>End</th>
            <th>Reason</th>
          </tr>
        </thead>
        <tbody>
          {leaves.length > 0 ? (
            leaves.map((leave, i) => (
              <tr key={i}>
                <td>{new Date(leave.startDate).toLocaleDateString()}</td>
                <td>{new Date(leave.endDate).toLocaleDateString()}</td>
                <td>{leave.reason}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" style={{ textAlign: "center" }}>
                No leave requests found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default App;
