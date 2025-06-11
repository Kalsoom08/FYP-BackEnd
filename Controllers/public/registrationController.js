const Registration= require('../../Models/registrationModel')
const catchAsync = require('../../Utils/catchAsynch')

const getAllStudents = catchAsync(async (req, res) => {
  const students = await Registration.find();
  if (!students) {
    return res.status(404).json({ message: 'Student not found' });
  }
  res.status(200).json({  students });
});


const getStudentByRegNumber = catchAsync(async (req, res) => {
  const student = await Registration.findOne({ regNumber: req.params.regNumber });
  if (!student) {
    return res.status(404).json({ message: 'Student not found' });
  }
  res.status(200).json({ student });
});


module.exports = {getAllStudents, getStudentByRegNumber}
