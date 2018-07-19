const express = require('express');
const app = express();

app.get('*', (req, res) => {
  res.status(403).json({
    error: "Malformed Endpoint"
  });
});

module.exports = app;