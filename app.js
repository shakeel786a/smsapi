require("dotenv").config();
const express = require("express");
const app = express();
const connectDB = require("./db/connect");
const productRoutes = require("./routes/products");
const menuRoutes = require("./routes/menu");
const userRoles = require("./routes/userRole");
const users = require("./routes/users");
const states = require("./routes/states");

const PORT = process.env.PORT || 4000;

// Middleware or to set router
app.use(express.json());
app.use(express.urlencoded());
app.use("/api/products", productRoutes);
app.use("/api/menu", menuRoutes);
app.use("/api/userRoles", userRoles);
app.use("/api/users", users);
app.use("/api/states", states);

app.get("/", (req, res) => {
  res.send("Hi, I am live");
});

const start = async () => {
  try {
    await connectDB(process.env.MONGODB_URL);
    app.listen(PORT, () => {
      console.log(`${PORT} Yes I am connected.`);
    });
  } catch (error) {
    console.log("error====>", error);
  }
};

start();
