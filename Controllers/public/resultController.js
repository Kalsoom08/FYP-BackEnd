const catchAsync = require('../../Utils/catchAsynch.js');
const Result = require('../../Models/resultModel.js');
const searchResult = catchAsync(async (req, res) => {
    const { department, semester, rollNumber } = req.body;
    if (!department || !semester || !rollNumber) {
        return res.status(400).json({
            message: "Please provide department, semester and roll number. "
        });
    }
    const result = await Result.findOne({
        department,
        semester,
        rollNumber
    });
    if (!result) {
        return res.status(404).json({ message: "Result not Found!"});
    }
    res.status(200).json({
        message: "Result Found",
        data: result,
    });
});
module.exports = { searchResult };