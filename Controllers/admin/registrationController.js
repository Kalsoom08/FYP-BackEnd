const Registration = require('../../Models/registrationModel'); 
const cloudinary  = require('../../Config/cloudinary');
const catchAsync  = require('../../Utils/catchAsynch');
const fs          = require('fs');
const xlsx        = require('xlsx');

const uploadRegistrationStatus = catchAsync(async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  const filePath = req.file.path;
  const isExcel  = /\.(xlsx?|xls)$/i.test(req.file.originalname);
  if (!isExcel) {
    fs.unlinkSync(filePath);
    return res.status(400).json({ message: 'Please upload a valid Excel file (.xlsx or .xls)' });
  }

  let result;
  try {
    result = await cloudinary.uploader.upload(filePath, {
      folder: 'registration_status',
      resource_type: 'auto',
    });
  } catch (uploadErr) {
    fs.unlinkSync(filePath);
    return res.status(500).json({ message: 'Failed to upload to Cloudinary' });
  }

  const buffer = fs.readFileSync(filePath);
  let workbook;
  try {
    workbook = xlsx.read(buffer, { type: 'buffer' });
  } catch (readErr) {
    fs.unlinkSync(filePath);
    return res.status(400).json({ message: 'Invalid Excel file' });
  }

  const sheetName = workbook.SheetNames[0];
  const sheet     = workbook.Sheets[sheetName];
  const rows      = xlsx.utils.sheet_to_json(sheet);

  const registrationStatus = rows.map((row) => {
      const regNumber = row.regNumber || row.RegNumber || row['Reg Number'] || '';
      const regStatus = row.isRegistered ?? row.IsRegistered ?? row.registered ?? '';
      return {
        regNumber  : regNumber.toString().trim(),
        isRegistered: String(regStatus).toLowerCase() === 'true',
        remarks    : row.remarks || row.Remarks || '',
      };
    })
    .filter((r) => r.regNumber);            

  fs.unlinkSync(filePath);

  const saved = await Registration.insertMany(registrationStatus,{ordered: false});

  res.status(201).json({
    message      : 'Status Uploaded Successfully',
    count        : saved.length,
    cloudinaryUrl: result.secure_url,
  });
});



const updateRegistrationStatus = catchAsync(async(req, res)=>{
  const updated = await Registration.findByIdAndUpdate(req.params.id, req.body,{
    new: true,
    runValidators: true
  })
  if(!updated) return res.status(404).json({ message: 'Registration not found' });

  res.status(200).json({message: 'Updated Successfully', data : updated})
})


const deleteRegistrationStatus = catchAsync(async(req, res)=>{
  const deleted = await Registration.findByIdAndDelete(req.params.id)
  if(!deleted) return res.status(404).json({ message: 'Registration not found' });
  res.status(200).json({ message: 'Deleted successfully' });
})

module.exports = { uploadRegistrationStatus, updateRegistrationStatus, deleteRegistrationStatus };
