const express = require("express");
const cors = require("cors");
const sequelize = require("./config/db");
const cardRoutes = require("./routes/cardRoutes");

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("MemoryLeaf Backend is running!");
});

app.use((req, res, next) => {
  console.log(`🌍 Requête reçue: ${req.method} ${req.url}`);
  next();
});


app.use("/cards", cardRoutes);

const PORT = process.env.PORT || 5000;

sequelize.sync().then(() => {
  console.log("📦 Database synchronized");
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
});
