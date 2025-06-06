const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const { connectDB } = require('./Config/db.js');
//Routes
// const authRoutes = require('./Routes/admin/authRoute.js')
// const clodinaryRoute = require('./Routes/admin/cloudinary.js');
// const adminTimetableRoute = require('./Routes/admin/timeTableRoute.js');
// const publicTimetableRoute = require('./Routes/public/timeTableRoute.js');
// const adminNotificationRoute = require('./Routes/admin/notificationsRoute.js')
// const publicNotificationRoute = require('./Routes/public/notificationsRoute.js')
// const adminNotesRoute = require('./Routes/admin/notesRoute.js')
// const publicNotesRoute = require('./Routes/public/notesRoute.js')
// const adminRollnumberRoute = require('./Routes/admin/rollNumberRoutes.js')
// const publicDatesheetRoute = require('./Routes/public/datesheetRoutes.js');
// const publicRollnumberRoute = require('./Routes/public/rollNumberRoute.js')

require('dotenv').config();
connectDB();



const app = express();
app.use(cors())
app.use(express.json());



// app.use('/api/admin', authRoutes);
// // app.use('/api', clodinaryRoute);
// app.use('/api/admin', adminTimetableRoute);
// app.use('/api/public', publicTimetableRoute);
// app.use('/api/admin', adminNotificationRoute)
// app.use('/api/public', publicNotificationRoute)
// app.use('/api/admin', adminNotesRoute)
// app.use('/api/public', publicNotesRoute)
// app.use('/api/admin', adminRollnumberRoute)
// app.use('/api/public', publicNotificationRoute);
// app.use('/api/public', publicNotesRoute);
// app.use('/api/public', publicDatesheetRoute);
// app.use('/api/public', publicRollnumberRoute)





const port = process.env.PORT;
app.listen(port, () => console.log(`http://localhost:${port} is now running`));