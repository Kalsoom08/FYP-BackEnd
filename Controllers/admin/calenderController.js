 const cloudinary = require('../../Config/cloudinary.js');
const catchAsync = require('../../Utils/catchAsynch.js');
const Calender = require('../../Models/calenderModel.js')
const fs = require('fs');

const uploadCalender = catchAsync(async(req, res)=>{
    const {title, description, type, startDate, endDate} = req.body;
    const filePath = req.file.path;
    
    const result = await cloudinary.uploader.upload(filePath, {
        folder : 'calender',
        resource_type : 'auto'
    })

    fs.unlinkSync(filePath)

    const newCalender = await Calender.create({
        title,
        description,
        type,
        startDate,
        endDate,
        fileUrl : result.secure_url,
        publicID : result.public_id
    })

    res.status(201).json({
        message : 'Calender Added Successfully',
        calender : newCalender
    })
})


const updateCalender = catchAsync(async(req, res)=>{
     const updated = await Calender.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!updated) return res.status(404).json({ message: 'Calender not found' });
      res.status(200).json({ message: 'Updated successfully', data: updated });
})


const deleteCalender = catchAsync(async (req, res) => {
  const deleted = await Calender.findByIdAndDelete(req.params.id);
  if (!deleted) return res.status(404).json({ message: 'Calender not found' });
  res.status(200).json({ message: 'Deleted successfully' });
});
module.exports = {uploadCalender, updateCalender, deleteCalender}