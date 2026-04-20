const express = require("express");
const router = express.Router();
const Property = require("../models/Property");

// create property
router.post("/", async (req, res) => {
  const property = await Property.create(req.body);
  res.json(property);
});

// get properties
router.get("/", async (req, res) => {
  const properties = await Property.find();
  res.json(properties);
});

// delete property
router.delete("/:id", async (req, res) => {
  await Property.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

module.exports = router;