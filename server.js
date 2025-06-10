const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const { connectDB } = require('./Config/db.js');
//Routes
//admin Routes
const authRoutes = require('./Routes/admin/authRoute.js')
const clodinaryRoute = require('./Routes/admin/cloudinary.js');
const adminTimetableRoute = require('./Routes/admin/timeTableRoute.js');
const adminNotificationRoute = require('./Routes/admin/notificationsRoute.js');
const adminNotesRoute = require('./Routes/admin/notesRoute.js');
const adminRollnumberRoute = require('./Routes/admin/rollNumberRoutes.js');
const adminDatesheetRoute = require('./Routes/admin/dateSheetRoutes.js');
const adminResultRoutes = require('./Routes/admin/resultRoutes.js');
const adminTopStudentRoutes = require('./Routes/admin/topStudentRoute.js'); 
const adminCalenderRoute = require('./Routes/admin/calenderRoutes.js')
//Public Routes
const publicNotesRoute = require('./Routes/public/notesRoute.js')
const publicTimetableRoute = require('./Routes/public/timeTableRoute.js');
const publicNotificationRoute = require('./Routes/public/notificationsRoute.js')
const publicDatesheetRoute = require('./Routes/public/datesheetRoutes.js');
const publicResultRoute = require('./Routes/public/resultRoutes.js');
require('dotenv').config();
connectDB();



const app = express();
app.use(cors())
app.use(express.json());


//admin
app.use('/api/admin', authRoutes);
// app.use('/api', clodinaryRoute);
app.use('/api/admin', adminTimetableRoute);
app.use('/api/admin', adminNotificationRoute);
app.use('/api/admin', adminNotesRoute);
app.use('/api/admin', adminRollnumberRoute);
app.use('/api/admin', adminDatesheetRoute);
app.use('/api/admin', adminResultRoutes);
app.use('/api/admin', adminTopStudentRoutes);
app.use('/api/admin', adminCalenderRoute)
//public
app.use('/api/public', publicTimetableRoute);
app.use('/api/public', publicNotificationRoute);
app.use('/api/public', publicNotesRoute);
app.use('/api/public', publicDatesheetRoute);
app.use('/api/public', publicResultRoute);




const port = process.env.PORT;
app.listen(port, () => console.log(`http://localhost:${port} is now running`));
