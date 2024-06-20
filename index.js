const express = require('express');
const connectDB = require('./config/db');
require('dotenv').config();


const app = express();
const PORT = process.env.PORT || 8000;

connectDB();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(PORT, () => {
  console.log(`App Listening at http://localhost:${PORT}`);
});




