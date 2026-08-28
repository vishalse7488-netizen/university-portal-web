const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

// --------------------------------------
// MongoDB connection with DB path
// --------------------------------------
const dbPath = "mongodb+srv://vishalse7488_db_user:<db_password>@vishal.ffztckf.mongodb.net/?appName=vishal"
// Change "mydatabase" to your DB name

mongoose
  .connect(dbPath, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected at:", dbPath))
  .catch((err) => console.error("❌ MongoDB Error:", err));

// --------------------------------------
// Simple schema + model example
// --------------------------------------
const ItemSchema = new mongoose.Schema({
  name: String,
  createdAt: { type: Date, default: Date.now },
});

const Item = mongoose.model("Item", ItemSchema);

// --------------------------------------
// Routes
// --------------------------------------
app.get("/", (req, res) => {
  res.send("MongoDB server running ✔️");
});

// Create item
app.post("/items", async (req, res) => {
  try {
    const item = await Item.create(req.body);
    res.status(201).json(item);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all items
app.get("/items", async (req, res) => {
  const items = await Item.find();
  res.json(items);
});

// --------------------------------------
// Start the server
// --------------------------------------
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
