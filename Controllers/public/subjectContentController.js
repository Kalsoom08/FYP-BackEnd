const catchAsync = require('../../Utils/catchAsynch')
const Subjects = require('../../Models/subjectContentModel')

const getAllSubjects = catchAsync(async(req, res)=>{
    const subject = await Subjects.find()
    if(!subject){
    return res.status(404).json({ message: 'Subjects not found' });
  }
  res.status(200).json({ data :  subject});
})

const getSubjectBySemester = catchAsync(async(req, res)=>{
    const semester = req.params.semester;
    const subject = await Subjects.find({ semester: { $regex: `^${semester}`, $options: 'i' } });

    if (subject.length === 0) {
    return res.status(404).json({ message: 'No Subject found for that semester' });
  }
  res.status(200).json({  data: subject });

}) 

module.exports = {getAllSubjects, getSubjectBySemester}