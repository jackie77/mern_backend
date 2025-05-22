import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import ProductRoutes from "./routes/product.route.js";
import DaggerRoutes from "./routes/dagger.route.js";

var cors = require("cors");

const app = express();
app.use(cors());

dotenv.config();

//const PORT = 5009
app.get("/", (req, res) => {
  res.send("Express JS on Vercel");
});

app.get("/ping", (req, res) => {
  console.log("getPING");
  res.send("pong 🏓");
});

const port = process.env.PORT || 8080;
app.use(express.json());
app.use("/api/products", ProductRoutes);
app.use("/api/daggers", DaggerRoutes);

console.log(process.env.MONGO_URI);
console.log(port);

app.listen(port, (err, res) => {
  connectDB();
  if (err) {
    console.log(err);
    return res.status(500).send(err.message);
  } else {
    console.log("[INFO] Server Running on port:", port);
  }
});
