// const cloudinary = require('../../Config/cloudinary');
// const catchAsync = require('../../Utils/catchAsynch');
// const fs = require('fs');

// const uploadController = catchAsync(async (req, res) => {
//   const filePath = req.file.path;

//   const result = await cloudinary.uploader.upload(filePath,{
//     folder: 'uploads', 
//     resource_type: 'auto',
//   });

//    fs.unlinkSync(filePath);


//   res.status(200).json({
//     message: 'File uploaded successfully',
//     url: result.secure_url,
//     public_id: result.public_id,
//   });
// });

// module.exports = uploadController;
