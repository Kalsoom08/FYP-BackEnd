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

module.exports = {uploadCalender}