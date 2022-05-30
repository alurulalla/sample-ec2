const express = require("express");
const dotenv = require("dotenv");
const redis = require("redis");

const products = require("./data");

const app = express();
app.use(express.json());
dotenv.config();

const PORT = process.env.PORT || 8080;
const REDIS_PORT = process.env.PORT || 6379;

const client = redis.createClient(REDIS_PORT);

(async () => client.connect())();

client.on("connect", function () {
  console.log("Redis is ready");
});

client.on("error", function () {
  console.log("Error in Redis");
});

app.get("/api/products", (req, res) => {
  console.log("here");
  res.json(products);
});

app.listen(PORT, () => console.log(`app listening on port ${PORT}`));
