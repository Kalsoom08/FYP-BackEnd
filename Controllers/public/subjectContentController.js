const catchAsync = require('../../Utils/catchAsynch')
const Subjects = require('../../Models/subjectContentModel')

const getAllSubjects = catchAsync(async(req, res)=>{
    const subject = await Subjects.find()
    if(!subject){
    return res.status(404).json({ message: 'Subjects not found' });
  }
  res.status(200).json({ data :  subject});
})

const getSubjectBySemester = catchAsync(async (req, res) => {
  const { semester, department } = req.params;

  const subjects = await Subjects.find({
    semester: { $regex: `^${semester}`, $options: 'i' },
    department: { $regex: `^${department}`, $options: 'i' }
  });

  if (subjects.length === 0) {
    return res.status(404).json({ message: 'No Subject found for that semester and department' });
  }

  res.status(200).json({ data: subjects });
});


module.exports = {getAllSubjects, getSubjectBySemester}