const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const { connectDB } = require('./Config/db.js');
require('dotenv').config();

//mport routes there when created


//database connection
connectDB();

const app = express();
app.use(express.json());


//All routes app middleware there

const port = process.env.PORT;
app.listen(port, () => console.log(`http://localhost:${port} is now running`));