const TopStudents = require('../../Models/top10StudentsModel.js');
const catchAsync = require('../../Utils/catchAsynch.js');
const cloudinary = require('../../Config/cloudinary.js');
const fs = require('fs');
const uploadTop10Students = catchAsync(async (req, res) => {
    const { department, semester } = req.body;

    if (!req.file) {
        return res.status(400).json({
            message: "No PDF file uploaded"
        });
    }

    const alreadyExists = await TopStudents.findOne({ department, semester });
    if (alreadyExists) {
        return res.status(409).json({ message: 'Top 10 list already exists for this semester and department.' });
    }

    const uploadrecord = await cloudinary.uploader.upload(req.file.path, {
        folder: "Top-10-Students",
        resource_type: "raw",
    });

    fs.unlinkSync(req.file.path);

    const topStudentDoc = await TopStudents.create({
        department,
        semester,
        pdfUrl: uploadrecord.secure_url,
        publicId: uploadrecord.public_id, 
    });

    res.status(201).json({
        message: 'Top 10 students PDF uploaded.',
        data: topStudentDoc,
    });
});

const getTopStudents = catchAsync(async (req, res) => {
    const { department, semester } = req.query;

    if (!department || !semester) {
        return res.status(400).json({ message: "Department and Semester are required." });
    }

    const record = await TopStudents.findOne({ department, semester });
    if (!record) {
        return res.status(404).json({ message: "No record found for given department and semester." });
    }

    res.status(200).json({
        message: "Top 10 students list found.",
        data: record,
    });
});

const updateTopStudentPdf = catchAsync(async (req, res) => {
    const { id } = req.params;
    const { department, semester } = req.body;

    const record = await TopStudents.findById(id);
    if (!record) {
        return res.status(404).json({ message: "Record not found" });
    }

    if (req.file) {
        await cloudinary.uploader.destroy(record.publicId, { resource_type: "raw" });

        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: 'Top-10-Students',
            resource_type: 'raw',
        });
        fs.unlinkSync(req.file.path);
        record.pdfUrl = result.secure_url;
        record.publicId = result.public_id;
    }

    if (department) record.department = department;
    if (semester) record.semester = semester;

    await record.save();

    res.status(200).json({
        message: "Top 10 Students PDF updated successfully",
        data: record,
    });
});

const deleteTopStudentPdf = catchAsync(async (req, res) => {
    const { id } = req.params;
    const topStudentDoc = await TopStudents.findById(id);
    if (!topStudentDoc) {
        return res.status(404).json({ message: "Top 10 Students record not found."});
    }
    await cloudinary.uploader.destroy(topStudentDoc.publicId, {
        resource_type: 'raw',
    });
        await TopStudents.findByIdAndDelete(id);
        res.status(200).json({
            message: "Top 10 Students PDF deleted successfully",
        });
});

module.exports = { uploadTop10Students, deleteTopStudentPdf, getTopStudents, updateTopStudentPdf };