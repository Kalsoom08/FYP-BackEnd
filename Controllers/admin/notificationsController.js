const Notifications = require('../../Models/notificationsModel');
const cloudinary = require('../../Config/cloudinary');
const catchAsync = require('../../Utils/catchAsynch');
const fs = require('fs');

const uploadNotification = catchAsync(async (req, res) => {
  const { title, description, type } = req.body;
  const filePath = req.file?.path;
  let fileUrl;

  if (req.file) {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: 'notifications',
    });
    fileUrl = result.secure_url;
    fs.unlinkSync(filePath); 
  }

  const newNotification = await Notifications.create({
    title,
    description,
    type,
    fileUrl, 
  });
 res.status(201).json({
    message: 'Notification Uploaded Successfully',
    notification: newNotification,
  });
});

 

 
const updateNotification = catchAsync(async(req, res)=>{
  const {id} = req.params;
  let update = req.body;
  const filePath = req.file?.path;
  
  if(req.file){
    const result = await cloudinary.uploader.upload(filePath, {
      folder: 'notifications',
    })
    update = result.secure_url;
  }

  const updateInDB = await Notifications.findByIdAndUpdate(id, update, {new: true})

    res.status(201).json({
    message: 'Notification Updated Successfully',
    notification: updateInDB,
  });
})
module.exports = { uploadNotification, updateNotification };
