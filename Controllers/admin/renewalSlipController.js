const RenewalSlip = require('../../Models/renewalSlipModel.js');
const cloudinary = require('../../Config/cloudinary.js');
const catchAsync = require('../../Utils/catchAsynch.js');
const fs = require('fs');

const uploadRenewalSlip = catchAsync(async (req, res) => {
    const { classNo, department, semester } = req.body;
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

const getAllRenewalSlip = catchAsync (async (req, res) => {
    const slips = await RenewalSlip.find().sort({ createdAt: -1 });
    res.status(200).json({
        message: "All renewal slipsfetched successfully!",
        data: slips
    });
});

const getRenewalSlip = catchAsync(async (req, res) => {
    const { classNo, department, semester } = req.query;
    const slip = await RenewalSlip.findOne({ classNo, department, semester });
    if (!slip) {
        return res.status(404).json({ message: "Renewal SLip not found! " });
    }
    res.status(200).json({ data: slip });
});

const deleteRenewalSlip = catchAsync (async (req, res) => {
    const { id } = req.params;
    const slip = await RenewalSlip.findById(id);
    if (!slip) {
        return res.status(404).json({ message: "Slip not Found" });
    }
        await cloudinary.uploader.destroy(slip.publicId, { resource_type: 'raw' });
        await slip.deleteOne();
        res.status(200).json({ message: "Renewal SLip deleted Successfully!" });
});

const updateRenewalSlip = catchAsync( async (req, res) => {
    const { id } = req.params;
    const { classNo, department, semester } = req.body;
    const slip = await RenewalSlip.findById(id);
    if(!slip) return res.status(404). json({ message: "Slip not Found !"});
    if (req.file) {
        await cloudinary.uploader.destroy(slip.publicId, { resource_type: 'raw' });
        const cloudRes = await cloudinary.uploader.upload(req.file.path, {
            folder: "RenewalSlips",
            resource_type: 'raw'
        });
        fs.unlinkSync(req.file.path);
        slip.pdfUrl = cloudRes.secure_url;
        slip.publicId = cloudRes.public_id;
    }
    slip.classNo = classNo || slip.classNo;
    slip.department = department || slip.department;
    slip.semester = semester || slip.semester;

    await slip.save();
    res.status(200).json({
        message: "Slip Updated Successfully ",
        data: slip
    });
});
module.exports = { uploadRenewalSlip, getAllRenewalSlip, getRenewalSlip, deleteRenewalSlip, updateRenewalSlip };