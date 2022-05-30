const express = require("express");
const dotenv = require("dotenv");
const redis = require("redis");

const products = require("./data");

const app = express();
app.use(express.json());
dotenv.config();

const PORT = process.env.PORT || 8080;
const REDIS_PORT = process.env.REDIS_PORT || 6379;

const client = redis.createClient(REDIS_PORT);

(async () => client.connect())();

client.on("connect", function () {
  console.log("Redis is ready");
});

client.on("error", function () {
  console.log("Error in Redis");
});

const delay = (time) => new Promise((res) => setTimeout(res, time));

async function getProducts(req, res, next) {
  // Set data to Redis
  console.log("in getproducts");
  client.set("products", JSON.stringify(products));
  console.log(products);
  await delay(5000);
  res.send(data);
}

// Cache middleware
async function cache(req, res, next) {
  console.log("in cache");
  const data = await client.get("products");
  console.log(data);
  if (data !== null) {
    res.send(JSON.parse(data));
  } else {
    next();
  }
}

app.get("/api/products", cache, getProducts);

app.listen(PORT, () => console.log(`app listening on port ${PORT}`));
