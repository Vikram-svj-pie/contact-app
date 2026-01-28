const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

/**
 * GET all contacts
 */
app.get("/contacts", (req, res) => {
  db.all("SELECT * FROM contacts", [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

/**
 * ADD new contact
 */
app.post("/contacts", (req, res) => {
  const { name, phone } = req.body;

  if (!name || !phone) {
    return res.status(400).json({ error: "Name and phone are required" });
  }

  db.run(
    "INSERT INTO contacts (name, phone) VALUES (?, ?)",
    [name, phone],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      res.status(201).json({
        id: this.lastID,
        name,
        phone
      });
    }
  );
});

/**
 * DELETE contact
 */
app.delete("/contacts/:id", (req, res) => {
  const { id } = req.params;

  db.run("DELETE FROM contacts WHERE id = ?", id, function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    res.json({ message: "Contact deleted" });
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Backend running on http://localhost:${PORT}`);
});
