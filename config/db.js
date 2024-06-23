const mongoose = require('mongoose');
require('dotenv').config();
const connectDB = async () => {
  try {
    console.log('Attempting to connect to MongoDB...');
    const conn= await mongoose.connect(process.env.MONGO_URI);
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
