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

module.exports = {uploadNotes}


