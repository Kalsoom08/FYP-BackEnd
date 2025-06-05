const cloudinary = require('../../Config/cloudinary.js');
const catchAsync = require('../../Utils/catchAsynch.js');
const Note = require('../../Models/notesModel.js');

const getNotes = catchAsync(async (req, res) => {
  const { subject, semester, department } = req.query;

   const filter = {};
  if(subject) filter.subject = subject
  if (semester) filter.semester = semester;
  if (department) filter.department = department;

  const Notes = await Note.find(filter).sort({ createdAt: -1 }).lean();

  const notesWithDownloadLink = Notes.map(note => {
    const downloadLink = cloudinary.url(note.publicId, {
      resource_type: 'raw',
      flags: 'attachment', 
    });

    return {
      ...note,
      downloadLink, 
    };
  });

  res.status(200).json(notesWithDownloadLink);
});

module.exports = getNotes;
