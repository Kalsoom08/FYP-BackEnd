const TimeTable = require('../../Models/timeTableModel.js');
const cloudinary = require('../../Config/cloudinary.js');
const catchAsync = require('../../Utils/catchAsynch.js');
const fs = require('fs');

const uploadTimeTable = catchAsync(async (req, res) => {
    const { department, semester, section } = req.body;
    const filePath = req.file.path;

    const result = await cloudinary.uploader.upload(filePath, {
        folder: 'timetables',
        resourse_type: 'auto',
    });

    fs.unlinkSync(filePath);

    const newTimeTable = await TimeTable.create({
        department,
        semester,
        section,
        fileUrl: result.secure_url,
        publicId: result.public_id
    });
    res.status(201).json({
        message: 'Timetable Uploaded Successfully',
        TimeTable : newTimeTable,
    });
});

module.exports = { uploadTimeTable };