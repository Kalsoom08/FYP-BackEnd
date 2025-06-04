const cloudinary = require('../../Config/cloudinary.js');
const catchAsync = require('../../Utils/catchAsynch.js');
const Notes = require('../../Models/notesModel.js')
const fs = require('fs');

const uploadNotes = catchAsync(async(req, res)=>{
    const {subject, semester, department } = req.body;
    const filePath = req.file.path;

    const result = await cloudinary.uploader.upload(filePath, {
        folder : 'notes', 
        resource_type :'auto'
    })
    fs.unlinkSync(filePath)

    const newNotes = await Notes.create({
        subject,
        semester, 
        department,
        fileUrl: result.secure_url,
        publicId: result.public_id
    })

    res.status(201).json({
        message : "Notes Uploaded Successfully",
        notes : newNotes
    })
})


const updateNotes = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { subject, semester, department } = req.body;

  const note = await Notes.findById(id);
  if (!note) {
    return res.status(404).json({ message: 'Note not found!' });
  }

  if (subject) note.subject = subject;
  if (semester) note.semester = semester;
  if (department) note.department = department;

  if (req.file) {
    const filePath = req.file.path;

    if (note.publicId) {
      await cloudinary.uploader.destroy(note.publicId, {
        resource_type: 'raw',
      });
    }

    const result = await cloudinary.uploader.upload(filePath, {
      folder: 'notes',
      resource_type: 'raw',
    });

    fs.unlinkSync(filePath);
    note.fileUrl = result.secure_url;
    note.publicId = result.public_id;
  }

  await note.save();

  res.status(200).json({
    message: 'Note updated successfully',
    note: note.toObject(),
  });
});


const deleteNotes = catchAsync(async (req, res) => {
  const { id } = req.params;

  const note = await Notes.findById(id);
  if (!note) {
    return res.status(404).json({ message: 'Note not found!' });
  }

  if (note.publicId) {
    await cloudinary.uploader.destroy(note.publicId, {
      resource_type: 'raw',
    });
  }

  await Notes.findByIdAndDelete(id);

  res.status(200).json({
    message: 'Note deleted successfully',
  });
});




module.exports = {uploadNotes, updateNotes, deleteNotes}


