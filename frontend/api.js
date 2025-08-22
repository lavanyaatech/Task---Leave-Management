const API_BASE = "http://localhost:5000/api";

export async function applyLeave(data) {
  const res = await fetch(`${API_BASE}/leave/apply`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function getMyLeaves(userId) {
  const res = await fetch(`${API_BASE}/leave/mine/${userId}`);
  return res.json();
}
