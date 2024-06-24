const Json = require('./json.model');
const express = require('express');
const app = express();

app.get('/', async (req, res) => {
  try {
    const insights = await Json.find();
    res.json(insights);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = app;