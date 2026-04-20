const express = require("express");
const router = express.Router();
const Client = require("../models/Client");

// create client
router.post("/", async (req, res) => {
  const client = await Client.create(req.body);
  res.json(client);
});

// get clients
router.get("/", async (req, res) => {
  const clients = await Client.find();
  res.json(clients);
});

module.exports = router;