const express = require('express');
const cors = require('cors');
const { connectDB } = require('./Config/db.js');
require('dotenv').config();
connectDB();
const app = express();
app.use(cors())
app.use(express.json());

//Admin Routes
const authRoute = require('./Routes/admin/authRoute.js');
const adminCalenderRoute = require('./Routes/admin/calenderRoutes.js')
const adminDateSheetRoute = require('./Routes/admin/dateSheetRoutes.js')
const adminMapRoute = require('./Routes/admin/mapRoutes.js')
const adminNotesRoute = require('./Routes/admin/notesRoute.js')
const adminNotificationRoute = require('./Routes/admin/notificationsRoute.js')
const adminRegistrationRoute = require('./Routes/admin/registrationRoutes.js')
const adminRenewalRoute = require('./Routes/admin/renewalSlipRoutes.js')
const adminResultRoute = require('./Routes/admin/resultRoutes.js')
const adminRollnumberRoute = require('./Routes/admin/rollNumberRoutes.js')
const adminSoftwaresRoute = require('./Routes/admin/softwareRoutes.js')
const adminSubjectRoute = require('./Routes/admin/subjectContentRoutes.js')
const adminTimetableRoute = require('./Routes/admin/timeTableRoute.js')
const adminTopstudentsRoute = require('./Routes/admin/topStudentRoute.js')


//Public Routes
const publicCalenderRoute = require('./Routes/public/calenderRoutes.js')
const publicDateSheetRoute = require('./Routes/public/datesheetRoutes.js')
const publicMapRoute = require('./Routes/public/mapRoutes.js')
const publicNotesRoute = require('./Routes/public/notesRoute.js')
const publicNotificationRoute = require('./Routes/public/notificationsRoute.js')
const publicRegistrationRoute = require('./Routes/public/registrationRoutes.js')
const publicRenewalRoute = require('./Routes/public/renewalSlipRoutes.js')
const publicResultRoute = require('./Routes/public/resultRoutes.js')
const publicRollnumberRoute = require('./Routes/public/rollNumberRoute.js')
const publicSoftwaresRoute = require('./Routes/public/softwareRoutes.js')
const publicSubjectRoute = require('./Routes/public/subjectContentRoutes.js')
const publicTimetableRoute = require('./Routes/public/timeTableRoute.js')
const publicTopstudentsRoute = require('./Routes/public/topStudentsRoutes.js')

//Admin API's
app.use('/api/admin', authRoute )
app.use('/api/admin', adminCalenderRoute)
app.use('/api/admin', adminDateSheetRoute)
app.use('/api/admin', adminMapRoute)
app.use('/api/admin', adminNotesRoute)
app.use('/api/admin', adminNotificationRoute)
app.use('/api/admin', adminRegistrationRoute)
app.use('/api/admin', adminRenewalRoute)
app.use('/api/admin', adminResultRoute)
app.use('/api/admin', adminRollnumberRoute)
app.use('/api/admin', adminSoftwaresRoute)
app.use('/api/admin', adminSubjectRoute)
app.use('/api/admin', adminTimetableRoute)
app.use('/api/admin', adminTopstudentsRoute)


//Public API's
app.use('/api/public', authRoute )
app.use('/api/public', publicCalenderRoute)
app.use('/api/public', publicDateSheetRoute)
app.use('/api/public', publicMapRoute)
app.use('/api/public', publicNotesRoute)
app.use('/api/public', publicNotificationRoute)
app.use('/api/public', publicRegistrationRoute)
app.use('/api/public', publicRenewalRoute)
app.use('/api/public', publicResultRoute)
app.use('/api/public', publicRollnumberRoute)
app.use('/api/public', publicSoftwaresRoute)
app.use('/api/public', publicSubjectRoute)
app.use('/api/public', publicTimetableRoute)
app.use('/api/public', publicTopstudentsRoute)

const port = process.env.PORT;
app.listen(port, () => console.log(`http://localhost:${port} is now running`));