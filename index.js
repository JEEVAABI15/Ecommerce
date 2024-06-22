const express = require('express');
const connectDB = require('./config/db');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
require('dotenv').config();


const app = express();
const PORT = process.env.PORT || 8000;

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());


app.use('/api/v1/users', userRoutes);

connectDB();



app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(PORT, () => {
  console.log(`App Listening at http://localhost:${PORT}`);
});




