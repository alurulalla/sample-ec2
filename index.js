const express = require("express");
const dotenv = require("dotenv");

const products = require("./data");

const app = express();
app.use(express.json());
dotenv.config();

const PORT = process.env.PORT || 8080;

app.get("/api/products", (req, res) => {
  console.log("here");
  res.json(products);
});

app.listen(PORT, () => console.log(`app listening on port ${PORT}`));
