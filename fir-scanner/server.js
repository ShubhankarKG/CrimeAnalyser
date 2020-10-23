const cors = require('cors');
const express = require('express');

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

app.use(express.static('pwa/build'));

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, "pwa/build/index.html"));
});
