const express = require("express");
const router = express.Router();
const Deal = require("../models/Deal");

// create deal
router.post("/", async (req, res) => {
  const deal = await Deal.create(req.body);
  res.json(deal);
});

// get deals
router.get("/", async (req, res) => {
  const deals = await Deal.find()
    .populate("clientId")
    .populate("propertyId");

  res.json(deals);
});

// update status
router.put("/:id", async (req, res) => {
  const deal = await Deal.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(deal);
});

// delete
router.delete("/:id", async (req, res) => {
  await Deal.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

module.exports = router;