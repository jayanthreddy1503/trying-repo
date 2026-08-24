// ============================================================
// 4. Introduction to Node.js and Express.js
// ============================================================
const express = require("express");
const cors = require("cors");
const path = require("path");
const { initDatabase } = require("./db");
const wardrobeRoutes = require("./routes/wardrobe");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "frontend")));

// 4.a 'Hello World' message through the browser using Express
app.get("/hello", (req, res) => {
  res.send("Hello World! Welcome to the Wardrobe Manager API.");
});

// 4.c Print 'Hello World' in the browser console using Express
// (the server sends a tiny page whose script logs to devtools console)
app.get("/console-hello", (req, res) => {
  res.send(`
    <html>
      <body>
        <p>Open your browser console to see the message.</p>
        <script>console.log("Hello World");</script>
      </body>
    </html>
  `);
});

// 4.b Multiple routes for a small website
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "frontend", "index.html"));
});

app.get("/about", (req, res) => {
  res.send("Digital Wardrobe Manager — track, organize, and plan your outfits.");
});

app.get("/api/status", (req, res) => {
  res.json({ status: "ok", service: "wardrobe-manager-api" });
});

// 4.d + 4.e CRUD routes, backed by the MySQL connection in db.js
app.use("/api/wardrobe", wardrobeRoutes);

async function start() {
  try {
    await initDatabase();
    app.listen(PORT, () => {
      console.log(`Hello World`);
      console.log(`Wardrobe Manager server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err.message);
    process.exit(1);
  }
}

start();
