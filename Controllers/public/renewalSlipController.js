const RenewalSlip = require('../../Models/renewalSlipModel.js');
const catchAsync = require('../../Utils/catchAsynch.js');

const getRenewalSlip = catchAsync (async (req, res) => {
    const { classNo, department, semester } = req.query;
    if (!classNo || !department || !semester) {
        return res.status(400).json({ message: "ClassNo, Department and semester are required." });
    }
    const slip = await RenewalSlip.findOne({ classNo, department, semester });
    if (!slip) {
        return res.status(404).json({ message: "No renewal slip found for the given information." });
    }
    res.status(200).json({
        message: "Renewal Slip Found.",
        data: {
            classNo: slip.classNo,
            department: slip.department,
            semester: slip.semester,
            pdfUrl: slip.pdfUrl
        }
    });
});
module.exports = { getRenewalSlip };