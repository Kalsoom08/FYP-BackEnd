const Notifications = require('../../Models/notificationsModel');
const cloudinary = require('../../Config/cloudinary');
const catchAsync = require('../../Utils/catchAsynch');
const fs = require('fs');

const uploadNotification = catchAsync(async (req, res) => {
  const { title, description, type } = req.body;

  if (!title || !description || !type) {
    return res.status(400).json({ message: "All fields are required!" });
  }

  let fileUrl;
  let publicId;
  const filePath = req.file?.path;

  if (filePath) {
    try {
      const result = await cloudinary.uploader.upload(filePath, {
        folder: 'notifications',
        resource_type: 'auto', 
      });
      fileUrl = result.secure_url;
      publicId = result.public_id;
      fs.unlinkSync(filePath);
    } catch (uploadErr) {
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath); 
      return res.status(500).json({
        message: "Cloudinary upload failed",
        error: uploadErr.message,
      });
    }
  }

  const newNotification = await Notifications.create({
    title,
    description,
    type,
    fileUrl: fileUrl || '', 
    publicId: publicId || '',
  });

  res.status(201).json({
    message: 'Notification Uploaded Successfully',
    notification: newNotification,
  });
});

const updateNotification = catchAsync(async (req, res) => {
  const { id } = req.params;
  const notification = await Notifications.findById(id);

  if (!notification) {
    return res.status(404).json({ message: "Notification not found!" });
  }

  const updates = { ...req.body };

  if (req.file) {
    if (notification.publicId) {
      await cloudinary.uploader.destroy(notification.publicId, { resource_type: 'auto' });
    }

    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'notifications',
      resource_type: 'auto',
    });

    updates.fileUrl = result.secure_url;
    updates.publicId = result.public_id;

    fs.unlinkSync(req.file.path);
  }

  const updatedNotification = await Notifications.findByIdAndUpdate(id, updates, { new: true });

  res.status(200).json({
    message: 'Notification Updated Successfully',
    notification: updatedNotification,
  });
});


const deleteNotification = catchAsync(async (req, res) => {
  const { id } = req.params;
  const notification = await Notifications.findById(id);

  if (!notification) {
    return res.status(404).json({ message: "Notification not Found!" });
  }

  if (notification.publicId) {
    await cloudinary.uploader.destroy(notification.publicId, { resource_type: 'auto' });
  }

  await Notifications.findByIdAndDelete(id); 

  res.status(200).json({
    message: "Notification Deleted successfully!",
  });
});


module.exports = { uploadNotification, updateNotification, deleteNotification };
