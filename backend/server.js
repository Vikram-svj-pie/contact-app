const express = require("express");
const app = express();

app.use(express.json());

// Test API
app.get("/", (req, res) => {
  res.json({
    status: "success",
    message: "Contact API is running"
  });
});

// Sample contacts API
app.get("/api/contacts", (req, res) => {
  res.json([
    { id: 1, name: "John", phone: "1234567890" },
    { id: 2, name: "Jane", phone: "9876543210" }
  ]);
});

// Add contact API
app.post("/api/contacts", (req, res) => {
  const { name, phone } = req.body;

  if (!name || !phone) {
    return res.status(400).json({ error: "Name and phone are required" });
  }

  res.status(201).json({
    message: "Contact added successfully",
    contact: {
      id: Date.now(),
      name,
      phone
    }
  });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Backend API running on http://localhost:${PORT}`);
});
