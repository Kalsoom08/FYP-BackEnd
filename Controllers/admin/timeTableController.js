const TimeTable = require('../../Models/timeTableModel.js');
const cloudinary = require('../../Config/cloudinary.js');
const catchAsync = require('../../Utils/catchAsynch.js');
const fs = require('fs');
const path = require('path');

// ✅ UPLOAD TIMETABLE
const uploadTimeTable = catchAsync(async (req, res) => {
  const { department, semester, section } = req.body;

  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded." });
  }

  const filePath = req.file.path;

  const result = await cloudinary.uploader.upload(filePath, {
    folder: 'timetables',
    resource_type: 'raw', // ✅ RAW for non-image files like PDFs
    public_id: `${department}-${semester}-${section}-${Date.now()}`,
    use_filename: true
  });

  fs.unlinkSync(filePath); // ✅ delete local copy after upload

  const newTimeTable = await TimeTable.create({
    department,
    semester,
    section,
    fileUrl: result.secure_url,
    publicId: result.public_id
  });

  res.status(201).json({
    message: 'Timetable Uploaded Successfully',
    timeTable: newTimeTable
  });
});

// ✅ GET ALL TIMETABLES
const getAllTimeTables = catchAsync(async (req, res) => {
  const timeTables = await TimeTable.find().sort({ createdAt: -1 });

  res.status(200).json({
    message: "All timetables fetched successfully.",
    count: timeTables.length,
    data: timeTables
  });
});

// ✅ GET TIMETABLE BY ID
const getTimeTableById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const timetable = await TimeTable.findById(id);
  if (!timetable) {
    return res.status(404).json({ message: "Timetable not found." });
  }

  res.status(200).json({ data: timetable });
});

// ✅ UPDATE TIMETABLE
const updateTimeTable = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { department, semester, section } = req.body;

  const timetable = await TimeTable.findById(id);
  if (!timetable) {
    return res.status(404).json({ message: 'Timetable not found' });
  }

  if (department) timetable.department = department;
  if (semester) timetable.semester = semester;
  if (section) timetable.section = section;

  if (req.file) {
    // ✅ delete previous PDF from Cloudinary
    if (timetable.publicId) {
      await cloudinary.uploader.destroy(timetable.publicId, {
        resource_type: 'raw'
      });
    }

    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'timetables',
      resource_type: 'raw',
      use_filename: true
    });

    fs.unlinkSync(req.file.path);

    timetable.fileUrl = result.secure_url;
    timetable.publicId = result.public_id;
  }

  await timetable.save();

  res.status(200).json({
    message: 'Timetable updated successfully',
    timeTable: timetable
  });
});

// ✅ DELETE TIMETABLE
const deleteTimeTable = catchAsync(async (req, res) => {
  const { id } = req.params;

  const timetable = await TimeTable.findById(id);
  if (!timetable) {
    return res.status(404).json({ message: "Timetable not found!" });
  }

  if (timetable.publicId) {
    await cloudinary.uploader.destroy(timetable.publicId, {
      resource_type: 'raw'
    });
  }

  await timetable.deleteOne();

  res.status(200).json({
    message: "Timetable deleted successfully!"
  });
});

module.exports = {
  uploadTimeTable,
  updateTimeTable,
  deleteTimeTable,
  getAllTimeTables,
  getTimeTableById
};
