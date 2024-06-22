const mongoose = require('mongoose');
require('dotenv').config();
const connectDB = async () => {
  try {
    const conn= await mongoose.connect(process.env.MONGODB_URL);
    console.log('MongoDB Connected...' + conn.connection.host , conn.connection.name);
    return conn.connection.name
  } catch (err) {
    console.error('Error connecting to MongoDB',err.message);
    return "not connected"
    process.exit(1);
    return "not connected"
  }
};  
module.exports = connectDB;
