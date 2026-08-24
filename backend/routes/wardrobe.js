const express = require("express");
const router = express.Router();
const { appPool } = require("../db");

// CREATE - add a new clothing item
router.post("/items", async (req, res) => {
  try {
    const { name, category, color, season } = req.body;
    if (!name || !category) {
      return res.status(400).json({ error: "name and category are required" });
    }

    const itemColor = color || null;
    const itemSeason = season || "All Season";

    const [result] = await appPool.query(
      "INSERT INTO clothing_items (name, category, color, season) VALUES (?, ?, ?, ?)",
      [name, category, itemColor, itemSeason]
    );

    res.status(201).json({
      id: result.insertId,
      name,
      category,
      color: itemColor,
      season: itemSeason,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ - get all clothing items
router.get("/items", async (req, res) => {
  try {
    const [rows] = await appPool.query(
      "SELECT * FROM clothing_items ORDER BY created_at DESC"
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ - get a single clothing item by id
router.get("/items/:id", async (req, res) => {
  try {
    const [rows] = await appPool.query(
      "SELECT * FROM clothing_items WHERE id = ?",
      [req.params.id]
    );
    if (rows.length === 0) return res.status(404).json({ error: "Item not found" });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE - edit a clothing item
router.put("/items/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, category, color, season, times_worn, is_favorite } = req.body;

    // 1. Fetch current item first to allow partial updates and prevent NULL overwrites
    const [existing] = await appPool.query(
      "SELECT * FROM clothing_items WHERE id = ?",
      [id]
    );
    if (existing.length === 0) {
      return res.status(404).json({ error: "Item not found" });
    }

    const currentItem = existing[0];

    // 2. Fall back to existing values if not supplied in req.body
    const updatedName = name !== undefined ? name : currentItem.name;
    const updatedCategory = category !== undefined ? category : currentItem.category;
    const updatedColor = color !== undefined ? color : currentItem.color;
    const updatedSeason = season !== undefined ? season : currentItem.season;
    const updatedTimesWorn = times_worn !== undefined ? times_worn : currentItem.times_worn;
    const updatedIsFavorite = is_favorite !== undefined ? is_favorite : currentItem.is_favorite;

    await appPool.query(
      `UPDATE clothing_items
       SET name = ?, category = ?, color = ?, season = ?, times_worn = ?, is_favorite = ?
       WHERE id = ?`,
      [
        updatedName,
        updatedCategory,
        updatedColor,
        updatedSeason,
        updatedTimesWorn,
        updatedIsFavorite,
        id,
      ]
    );

    res.json({ message: "Item updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE - remove a clothing item
router.delete("/items/:id", async (req, res) => {
  try {
    const [result] = await appPool.query(
      "DELETE FROM clothing_items WHERE id = ?",
      [req.params.id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ error: "Item not found" });
    res.json({ message: "Item deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;