const Result = require('../../Models/resultModel.js');
const cloudinary = require('../../Config/cloudinary.js');
const catchAsync = require('../../Utils/catchAsynch.js');
const xlsx = require('xlsx');
const fs = require('fs');

const uploadResultFromXlsx = catchAsync( async (req, res) => {
    if(!req.file) {
        return res.status(400).json({ message: "No FIle for result is uploaded! "});
    }
    if(!req.file.originalname.match(/\.(xlsx|xls)$/)) {
        fs.unlinkSync(req.file.path);
        return res.status(400).json({ message: "Please upload a valid Excel File (.xlsx or .xls "});

    }
    const uploadResultToCloudinary = await cloudinary.uploader.upload(req.file.path, {
        folder: 'results-xlsx',
        resourse_type: 'raw',
    });
    const fileBuffer = fs. readFileSync(req.file.path);
    const workbook = xlsx.read(fileBuffer, { type: 'buffer' });
    const sheetName = workbook.SheetName[0];
    const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

    fs.unlinkSync(req.file.path);

    const results = data.map((row) => ({
        rollNumber: row['Roll Number'],
        name: row['Name'],
        fatherName: row['Father Name'],
        semester: row['Semester'],
        department: row['Department'],
        section: row['Section'],
        gpa: parseFloat(row['GPA']) || 0,
        CGPA: parseFloat(row['CGPA']) || 0,
        failPapers: row['Fail Papers'] ? row['Fail Papers'].split(',').map(p => p.trim()) : [],
        absent: row['Absent']?.toString().toLowerCase() === 'true',
        dmcPdfUrl: uploadRes.secure_url,
    }));
    const inserted = awaitResult.insertMany(results);
    res.status(201).json({
        message: 'Result Uploaded Successfully fromExcel File',
        total: inserted.length,
    });
});
module.exports = { uploadResultFromXlsx };