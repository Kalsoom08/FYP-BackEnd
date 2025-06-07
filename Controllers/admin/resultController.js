const Result = require('../../Models/resultModel.js');
const cloudinary = require('../../Config/cloudinary.js');
const catchAsync = require('../../Utils/catchAsynch.js');
const xlsx = require('xlsx');
const fs = require('fs');

const uploadResultFromXlsx = catchAsync(async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file for result is uploaded!" });
  }
  if (!req.file.originalname.match(/\.(xlsx|xls)$/i)) {
    fs.unlinkSync(req.file.path);
    return res.status(400).json({ message: "Please upload a valid Excel File (.xlsx or .xls)" });
  }

  const uploadResultToCloudinary = await cloudinary.uploader.upload(req.file.path, {
    folder: 'results-xlsx',
    resource_type: 'raw',
  });

  const workbook = xlsx.readFile(req.file.path);
  const sheetName = workbook.SheetNames[0];
  const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

  fs.unlinkSync(req.file.path);

  const results = data
    .map(row => ({
      rollNumber: row['Roll Number']?.toString().trim(),
      name: row['Name']?.toString().trim(),
      fatherName: row['Father Name']?.toString().trim(),
      semester: row['Semester']?.toString().trim(),
      department: row['Department']?.toString().trim(),
      section: row['Section']?.toString().trim(),
      gpa: Number(row['GPA']) || 0,
      CGPA: Number(row['CGPA']) || 0,
      failPapers: row['Fail Papers'] ? row['Fail Papers'].split(',').map(p => p.trim()) : [],
      absent: String(row['Absent']).toLowerCase() === 'true',
      dmcPdfUrl: uploadResultToCloudinary.secure_url,
    }))
    .filter(row => row.rollNumber && row.fatherName && row.department);



  const inserted = await Result.insertMany(results, { ordered: false });

  res.status(201).json({
    message: 'Result Uploaded Successfully from Excel File',
    totalInserted: inserted.length,

  });
});

module.exports = { uploadResultFromXlsx };