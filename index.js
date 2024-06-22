const express = require('express');
const connectDB = require('./config/db');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
require('dotenv').config();


const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json())
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());


app.use('/api/v1/users', userRoutes);
app.use('/api/v1/products', productRoutes);








app.get('/', async(req, res) => {
  const isDbConnected = await connectDB();
  res.send('Hello World!'+isDbConnected);
});

app.listen(PORT, () => {
  console.log(`App Listening at http://localhost:${PORT}`);
});




