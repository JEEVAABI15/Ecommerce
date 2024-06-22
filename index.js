const express = require('express');
const connectDB = require('./config/db');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
require('dotenv').config();


const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json())
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());


app.use('/api/v1/users', userRoutes);
app.use('/api/v1/products', productRoutes);
app.use('/api/v1/orders', orderRoutes)




connectDB()


// async function connectionDB(){
//   try{
//     const isDbConnected = await connectDB();
//     console.log('isDbConnected:',isDbConnected);
//   }
//   catch(err){
//     console.error('Error in connectionDB:',err.message);
//   } 
// }
// connectDB();
// app.get('/', async(req, res) => {
  
//   try{
//     // const isDbConnected = await connectDB();

//     res.send('Hello World!');
//   }
//   catch(err){
//     console.error('Error in /:',err.message);
//     res.send('Error in /:'+err.message);    
//   }
  
// });

app.get('/', (req, res) => { 

  res.send('Hello World!');

});

app.listen(PORT, () => {
  console.log(`App Listening at http://localhost:${PORT}`);
});




