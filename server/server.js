const express = require("express");
const cors = require("cors");
const pool = require("./database.js");

const app = express();
const port = 2608;

app.use(express.json());
app.use(cors());

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
