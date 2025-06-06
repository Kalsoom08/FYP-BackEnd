const DateSheet = require('../../Models/dateSheetModel.js');
const catchAsync = require('../../Utils/catchAsynch.js');

const getDatesheet = catchAsync(async (req, res) => {
    const { department, semester, section } = req.query;

    const query = {};
    if (department) query.department = department;
    if (semester) query.semester = semester;
    if (section) query.section = section;
    const datesheet = await DateSheet.find(query);

    res.status(200).json({
        message: 'Datesheet fetch successfully!',
        datesheet,
    });
});
module.exports = { getDatesheet };