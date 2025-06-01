const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const { connectDB } = require('./Config/db.js');
const authRoutes = require('./Routes/admin/authRoute.js')
require('dotenv').config();
connectDB();



const app = express();
app.use(cors())
app.use(express.json());



app.use('/api/admin', authRoutes);


const port = process.env.PORT;
app.listen(port, () => console.log(`http://localhost:${port} is now running`));