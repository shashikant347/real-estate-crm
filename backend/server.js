const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const authRoutes = require("./routes/auth");
const leadRoutes = require("./routes/lead");

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// test route
app.get("/", (req, res) => {
  res.send("CRM Backend Running");
});


app.use("/api/auth", authRoutes);

app.use("/api/leads", leadRoutes);
app.use("/api/properties", require("./routes/property"));
app.use("/api/clients", require("./routes/client"));
app.use("/api/deals", require("./routes/deal"));

// DB connect
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.log(err));

// server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});