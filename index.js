const express = require('express');
// const connectDB = require('./config/db');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json())
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

(async() => {
  try {
    console.log('Attempting to connect to MongoDB...');
    const conn= await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected...' + conn.connection.host , conn.connection.name);
    return conn.connection.name
  } catch (err) {
    console.error('Error connecting to MongoDB',err.message);
    return "not connected"
  }   
})();   

app.get('/', (req, res) => { 

  res.send('Hello this is working');

});

app.use('/api/v1/users', userRoutes);
app.use('/api/v1/products', productRoutes);
app.use('/api/v1/orders', orderRoutes)


app.listen(PORT, () => {
  console.log(`App Listening at http://localhost:${PORT}`);
});




