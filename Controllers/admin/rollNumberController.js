const RollNumber = require('../../Models/rollNumberModel');
const xlsx = require('xlsx');
const fs = require('fs');
const catchAsync = require('../../Utils/catchAsynch');
const cloudinary = require('../../Config/cloudinary');

const uploadRollNumbers = catchAsync(async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  if (!req.file.originalname.match(/\.(xlsx|xls)$/)) {
    fs.unlinkSync(req.file.path);
    return res.status(400).json({ message: 'Please upload a valid Excel file (.xlsx or .xls)' });
  }

  const result = await cloudinary.uploader.upload(req.file.path, {
    folder: 'rollNumbers',
    resource_type: 'raw',
  });

  
  const fileBuffer = fs.readFileSync(req.file.path);
  let workbook;
  try {
    workbook = xlsx.read(fileBuffer, { type: 'buffer' });
  } catch (err) {
    fs.unlinkSync(req.file.path);
    return res.status(400).json({ message: 'Failed to parse Excel file. Make sure the file is valid.' });
  }

  const sheetName = workbook.SheetNames[0];
  const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

  const rollNumbers = data.map(item => ({
    name: item.name || item.Name,
    classNumber: item.classNumber || item.classNumber,
    department: item.department || item.Department,
    semester: item.semester || item.Semester,
    section: item.section || item.Section,
    
  }));

  fs.unlinkSync(req.file.path);

  const saved = await RollNumber.insertMany(rollNumbers);

  res.status(201).json({
    message: 'Roll Numbers Uploaded Successfully',
    count: saved.length,
    cloudinaryUrl: result.secure_url,
  });
});


const updateRollNumber = catchAsync(async (req, res) => {
  const updated = await RollNumber.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!updated) return res.status(404).json({ message: 'Roll number not found' });
  res.status(200).json({ message: 'Updated successfully', data: updated });
});


const deleteRollNumber = catchAsync(async (req, res) => {
  const deleted = await RollNumber.findByIdAndDelete(req.params.id);
  if (!deleted) return res.status(404).json({ message: 'Roll number not found' });
  res.status(200).json({ message: 'Deleted successfully' });
});


module.exports = { uploadRollNumbers,updateRollNumber, deleteRollNumber };
