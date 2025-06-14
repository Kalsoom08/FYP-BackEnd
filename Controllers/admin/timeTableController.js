const TimeTable = require('../../Models/timeTableModel.js');
const cloudinary = require('../../Config/cloudinary.js');
const catchAsync = require('../../Utils/catchAsynch.js');
const fs = require('fs');

//upload timetable
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

//Get All timetables 
const getAllTimeTables = catchAsync(async (req, res) => {
  const timeTables = await TimeTable.find().sort({ createdAt: -1 });
  res.status(200).json({
    message: "All timetables fetched successfully.",
    count: timeTables.length,
    data: timeTables,
  });
});

//Get timetable by Id
const getTimeTableById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const timetable = await TimeTable.findById(id);
  if (!timetable) {
    return res.status(404).json({ message: "Timetable not found." });
  }
  res.status(200).json({ data: timetable });
});

//update timetable
const updateTimeTable = catchAsync(async (req, res) => {
    const { id } = req.params;
    const { department, semester, section } = req.body;
    const timetable = await TimeTable.findById(id);
    if (!timetable) {
      return res.status(404).json({ message: 'Timetable not Found' });
    }
    if (department) timetable.department = department;
    if (semester) timetable.semester = semester;
    if (section) timetable.section = section;
    if (req.file) {
      if (timetable.publicId) {
        await cloudinary.uploader.destroy(timetable.publicId, { resource_type: 'raw' });
      }
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'timetables',
        resource_type: 'raw',
      });
      fs.unlinkSync(req.file.path);
      timetable.fileUrl = result.secure_url;
      timetable.publicId = result.public_id;
    }
    await timetable.save();
    res.status(200).json({
      message: 'Timetable updated successfully',
      timeTable: timetable.toObject(),
    });
});

//Delete Timetable
const deleteTimeTable = catchAsync (async (req, res) => {
  const { id } = req.params;
  const timetable = await TimeTable.findById(id);
  if(!timetable) {
    return res.status(404).json({ message: "Timetable not Found!"});
  }
  if (timetable.publicId) {
    await cloudinary.uploader.destroy(timetable.publicId, { resource_type: 'raw'});
  }
  await timetable.deleteOne();
  res.status(200).json({
    message: "Timetable deleted successfully!"
  });
}) ;

module.exports = { uploadTimeTable, updateTimeTable, deleteTimeTable, getAllTimeTables, getTimeTableById };