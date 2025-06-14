const HallStatement = require('../../Models/hallStatmentModel.js');
const cloudinary = require('../../Config/cloudinary');
const catchAsync = require('../../Utils/catchAsynch.js');
const fs = require('fs');

const uploadHallStatement = catchAsync(async (req, res) => {
  const { department, semester } = req.body;

  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  const alreadyExists = await HallStatement.findOne({ department, semester });
  if (alreadyExists) {
    return res.status(409).json({ message: "Hall Statement already exists for this semester & department." });
  }

  const result = await cloudinary.uploader.upload(req.file.path, {
    folder: 'hall-statements',
    resource_type: 'raw',
  });

  fs.unlinkSync(req.file.path);

  const newDoc = await HallStatement.create({
    department,
    semester,
    pdfUrl: result.secure_url,
    publicId: result.public_id,
  });

  res.status(201).json({ message: "Hall Statement uploaded", data: newDoc });
});

const getAllHallStatements = catchAsync(async (req, res) => {
  const hallStatements = await HallStatement.find().sort({ createdAt: -1 });

  res.status(200).json({
    message: "All hall statements retrieved",
    count: hallStatements.length,
    data: hallStatements,
  });
});

const getHallStatementById = catchAsync(async (req, res) => {
  const { id } = req.params;

  const hallStatement = await HallStatement.findById(id);
  if (!hallStatement) {
    return res.status(404).json({ message: "Hall Statement not found" });
  }

  res.status(200).json({
    message: "Hall Statement found",
    data: hallStatement,
  });
});

const updateHallStatement = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { department, semester } = req.body;

  const hallStatement = await HallStatement.findById(id);
  if (!hallStatement) {
    return res.status(404).json({ message: "Hall Statement not found" });
  }

  if (department) hallStatement.department = department;
  if (semester) hallStatement.semester = semester;

  if (req.file) {
    // Remove old file from Cloudinary
    if (hallStatement.publicId) {
      await cloudinary.uploader.destroy(hallStatement.publicId, {
        resource_type: 'raw',
      });
    }

    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'hall-statements',
      resource_type: 'raw',
    });

    fs.unlinkSync(req.file.path);
    hallStatement.pdfUrl = result.secure_url;
    hallStatement.publicId = result.public_id;
  }

  await hallStatement.save();
  res.status(200).json({
    message: "Hall Statement updated successfully",
    data: hallStatement,
  });
});

const deleteHallStatement = catchAsync(async (req, res) => {
  const { id } = req.params;
  const doc = await HallStatement.findById(id);

  if (!doc) {
    return res.status(404).json({ message: "Hall Statement not found" });
  }

  await cloudinary.uploader.destroy(doc.publicId, { resource_type: 'raw' });
  await doc.deleteOne();

  res.status(200).json({ message: "Hall Statement deleted successfully" });
});

module.exports = { uploadHallStatement, getAllHallStatements, getHallStatementById, updateHallStatement, deleteHallStatement};
