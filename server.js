require("dotenv").config();
const cors = require("cors");
const express = require("express");
const path = require("path");
const db = require("./queries");

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

app.set("view engine", "ejs");

app.use(express.static("fir-scanner/build"));

app.get('/users', db.getUsers);
app.get('/users/:id', db.getUserById);
app.post('/users', db.createUser);
app.put('/users/:id', db.updateUser);
app.delete('/users/:id', db.deleteUser);

// app.get("/*", (req, res) => {
//   res.sendFile(path.join(__dirname, "fir-scanner/build/index.html"));
// });

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
