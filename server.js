const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const { connectDB } = require('./Config/db.js');
const authRoutes = require('./Routes/admin/authRoute.js')
const clodinaryRoute = require('./Routes/admin/cloudinary.js');
const adminTimetableRoute = require('./Routes/admin/timeTableRoute.js');
const publicTimetableRoute = require('./Routes/public/timeTableRoute.js');
const notificationRoute = require('./Routes/admin/notificationsRoute.js')
require('dotenv').config();
connectDB();



const app = express();
app.use(cors())
app.use(express.json());



app.use('/api/admin', authRoutes);
// app.use('/api', clodinaryRoute);
app.use('/api/admin', adminTimetableRoute);
app.use('/api/public', publicTimetableRoute);
app.use('/api/admin', notificationRoute)

const port = process.env.PORT;
app.listen(port, () => console.log(`http://localhost:${port} is now running`));