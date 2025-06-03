const TimeTable = require('../../Models/timeTableModel.js');
const catchAsync = require('../../Utils/catchAsynch.js');

const getTimeTable = catchAsync(async (req, res) => {
    const { department, semester, section } = req.query;

    const query = {};
    if (department) query.department = department;
    if (semester) query.semester = semester;
    if (section) query.section = section;
    const timetables = await TimeTable.find(query);

    res.status(200).json({
        message: 'Timetable fetch successfully!',
        timetables,
    });
});
module.exports = { getTimeTable };