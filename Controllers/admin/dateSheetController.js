const DateSheet = require('../../Models/dateSheetModel.js');
const cloudinary = require('../../Config/cloudinary.js');
const catchAsync = require('../../Utils/catchAsynch.js');
const fs = require('fs');

const uploadDateSheet = catchAsync(async (req, res) => {
  const { department, semester } = req.body;
  const filePath = req.file.path;

  const result = await cloudinary.uploader.upload(filePath, {
    folder: 'datesheets',
    resource_type: 'raw',
  });

  fs.unlinkSync(filePath);

  const newDateSheet = await DateSheet.create({
    department,
    semester,
    fileUrl: result.secure_url,
    publicId: result.public_id,
  });

  res.status(201).json({
    message: 'Date Sheet uploaded successfully!',
    dateSheet: newDateSheet,
  });
});

//Get Datesheets 
const getAllDateSheets = catchAsync(async (req, res) => {
  const dateSheets = await DateSheet.find().sort({ createdAt: -1 });
  res.status(200).json({
    message: "All Date Sheets fetched successfully",
    count: dateSheets.length,
    data: dateSheets,
  });
});

//Get DateSheet By ID
const getDateSheetById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const dateSheet = await DateSheet.findById(id);
  if (!dateSheet) {
    return res.status(404).json({ message: "Date Sheet not found" });
  }
  res.status(200).json({ data: dateSheet });
});

//update dateSheet 
const updateDateSheet = catchAsync(async (req, res) => {
    const { id } = req.params;
    const { department, semester } = req.body;
    const datesheet = await DateSheet.findById(id);
    if (!datesheet) {
      return res.status(404).json({ message: 'DateSheet not Found' });
    }
    if (department) datesheet.department = department;
    if (semester) datesheet.semester = semester;
    if (req.file) {
      if (datesheet.publicId) {
        await cloudinary.uploader.destroy(datesheet.publicId, { resource_type: 'raw' });
      }
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'datesheets',
        resource_type: 'raw',
      });
      fs.unlinkSync(req.file.path);
      datesheet.fileUrl = result.secure_url;
      datesheet.publicId = result.public_id;
    }
    await datesheet.save();
    res.status(200).json({
      message: 'Datesheet updated successfully',
      datesheet: datesheet.toObject(),
    });
});

//Delete Datesheet
const deleteDateSheet = catchAsync (async (req, res) => {
  const { id } = req.params;
  const datesheet = await DateSheet.findById(id);
  if(!datesheet) {
    return res.status(404).json({ message: "Datesheet not Found!"});
  }
  if (datesheet.publicId) {
    await cloudinary.uploader.destroy(datesheet.publicId, { resource_type: 'raw'});
  }
  await datesheet.deleteOne();
  res.status(200).json({
    message: "Datesheet deleted successfully!"
  });
}) ;

module.exports = { uploadDateSheet, updateDateSheet, deleteDateSheet, getAllDateSheets, getDateSheetById  };
