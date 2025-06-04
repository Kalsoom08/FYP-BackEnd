const catchAsync = require('../../Utils/catchAsynch.js');
const Note = require('../../Models/notesModel.js')


const getNotes = catchAsync(async (req, res) => {
  const {subject , semester , department} = req.query;
  const filter = {};
  if(subject) filter.subject = subject
  if (semester) filter.semester = semester;
  if (department) filter.department = department;

  const Notes = await Note.find(filter).sort({ createdAt: -1 });
  res.status(200).json(Notes);
});

module.exports = getNotes