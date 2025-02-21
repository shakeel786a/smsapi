require("dotenv").config();
const express = require("express");
const app = express();
const connectDB = require("./api/db/connect");
const productRoutes = require("./api/routes/products");
const menuRoutes = require("./api/routes/menu");
const userRoles = require("./api/routes/userRole");
const users = require("./api/routes/users");
const states = require("./api/routes/states");
const city = require("./api/routes/city");

const PORT = process.env.PORT || 4000;

// Middleware or to set router
app.use(express.json());
app.use(express.urlencoded());
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/menu", menuRoutes);
app.use("/api/v1/userRoles", userRoles);
app.use("/api/v1/users", users);
app.use("/api/v1/states", states);
app.use("/api/v1/city", city);

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
    console.log("error=====>", error);
  }
};

start();
