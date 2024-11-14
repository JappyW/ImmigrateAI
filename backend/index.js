const express = require("express");
const cors = require("cors");
const { saveData, getData } = require("./database");

const app = express();
const port = 3000;

app.use(express.json());

const whitelist = ["http://localhost:5173"];

const corsOptionsDelegate = function (req, callback) {
  let corsOptions;
  if (whitelist.indexOf(req.header("Origin")) !== -1) {
    corsOptions = { origin: true };
  } else {
    corsOptions = { origin: false };
  }
  callback(null, corsOptions);
};

app.use(cors(corsOptionsDelegate));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/api/data", async (req, res) => {
  const data = await getData();
  res.json(data);
});

app.post("/api/data", async (req, res) => {
  const data = req.body;
  await saveData(data);
  res.send("Great success");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
