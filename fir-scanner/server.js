const cors = require("cors");
const express = require("express");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

app.set("view engine", "ejs");

app.use(express.static("pwa/build"));

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "pwa/build/index.html"));
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
