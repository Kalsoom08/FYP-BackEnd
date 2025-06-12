const CampusMap = require('../../Models/mapModel.js');
const cloudinary = require('../../Config/cloudinary.js');
const catchAsync = require('../../Utils/catchAsynch.js');
const fs = require('fs');

const uploadCampusMap = catchAsync(async (req, res) => {
 if (!req.file) {
    return res.status(400).json({ message: "No map file uploaded" });
  }
  const result = await cloudinary.uploader.upload(req.file.path, {
    folder: 'campus-maps',
    resource_type: 'auto'
  });

  fs.unlinkSync(req.file.path);
  await CampusMap.deleteMany({});
  const newMap = await CampusMap.create({
    mapUrl: result.secure_url,
    publicId: result.public_id,
  });
  res.status(201).json({ message: "Map uploaded", data: newMap });
});

const getCampusMap = catchAsync (async (req, res) => {
    const map = await CampusMap.findOne();
    if (!map) {
        return res.status(404).json({
            message: "No campus Map Found."
        });
    }
    res.status(200).json({ data : map });
});
const deletCampusMap = catchAsync(async (req, res) => {
    const map = await CampusMap.findOne();
    if (!map) {
        return res.status(404).json({ message: "No CAmpus Map Found to delete." });
    }
    await cloudinary.uploader.destroy(map.publicId, {
        resource_type: 'raw',
    });
    await CampusMap.deleteMany();
    res.status(200).json({ message: "Campus Map deleted successfully." });
});

module.exports = { uploadCampusMap, getCampusMap, deletCampusMap };