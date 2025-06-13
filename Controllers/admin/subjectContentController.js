const Subject = require('../../Models/subjectContentModel')
const catchAsync = require('../../Utils/catchAsynch')
const cloudinary = require('../../Config/cloudinary')
const fs = require('fs')
const { title } = require('process')

const uploadSubject = catchAsync(async(req, res)=>{
    const {title, description, semester} = req.body;
    const filePath = req.file.path;

    const result = await cloudinary.uploader.upload(filePath, {
        folder: 'Subjects',
        resource_type: 'auto'
    }) 
    fs.unlinkSync(filePath)

    const newSubject =  await Subject.create({
        title,
        description,
        semester,
        fileUrl: result.secure_url,
        publicId: result.public_id
    })

    res.status(201).json({
        message : 'Subject Added Successfully',
        data : newSubject
    })
})




const updateSubject = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { title, description, semester } = req.body;

  const subject = await Subject.findById(id);
  if (!subject) {
    return res.status(404).json({ message: 'Subject not found' });
  }

  if (title) subject.title = title;
  if (description) subject.description = description;
  if (semester) subject.semester = semester;

  if (req.file) {
    const filePath = req.file.path;
    if (subject.publicId) {
      await cloudinary.uploader.destroy(subject.publicId, {
        resource_type: 'raw',
      });
    }

    const result = await cloudinary.uploader.upload(filePath, {
      folder: 'Subjects',
      resource_type: 'auto',
    });

    fs.unlinkSync(filePath)

    subject.fileUrl = result.secure_url;
    subject.publicId = result.public_id;
  }

  await subject.save();

  res.status(200).json({
    message: 'Subject updated successfully',
    subject: subject.toObject(),
  });
});



const deleteSubject = catchAsync(async(req, res)=>{
const {id} = req.params;
const subject = await Subject.findById(id)
if(!subject){
    res.status(404).json({ message: 'Subject not found' })
}
await cloudinary.uploader.destroy(subject.publicId, {
    resource_type: 'raw'
})
await Subject.findByIdAndDelete(id)
 res.status(200).json({
    message: 'Subject deleted successfully',
  });

})
module.exports = {uploadSubject, updateSubject, deleteSubject}