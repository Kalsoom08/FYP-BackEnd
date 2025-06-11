const RenewalSlip = require('../../Models/renewalSlipModel.js');
const cloudinary = require('../../Config/cloudinary.js');
const catchAsync = require('../../Utils/catchAsynch.js');
const fs = require('fs');

const uploadRenewalSlip = catchAsync(async (req, res) => {
    const { classNo, department, semester } = req.body;
    if (!classNo || !department || !semester) {
        return res.status(400).json({ message: "ClassNo, department and semester are required!" });
    }
    if(!req.file) {
        return res.status(400).json({ message: "No PDF Uploaded!" });
    }
    const cloudRes = await cloudinary.uploader.upload(req.file.path, {
        folder: "RenewalSlips",
        resource_type: 'raw'
    });
    fs.unlinkSync(req.file.path);
    const isExist = await RenewalSlip.findOne({ classNo, department, semester });
    if (isExist) {
        return res.status(409).json({ message: "Renewal Slip already exist."});
    }
    const slip = await RenewalSlip.create({
        classNo,
        department,
        semester,
        pdfUrl: cloudRes.secure_url,
        publicId: cloudRes.public_id
    });
    res.status(201).json({
        message: "Renewal slip uploaded successfully.",
        data: slip
    });
});
module.exports = { uploadRenewalSlip };