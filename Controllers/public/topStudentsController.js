const TopStudents = require('../../Models/top10StudentsModel.js');
const catchAsync = require('../../Utils/catchAsynch.js');

const getTopStudents = catchAsync( async (req, res) => {
    const { department, semester } = req.query;
    if (!department || !semester ) {
        return res.status(400).json({ message: "Department and semester required!" });
    }
    const pdf = await TopStudents.findOne({ department, semester });
    if (!pdf) {
        return res.status(404).json({ message: "Top 10 List not found!" });
    }
    res.status(200).json({
        message: "Top 10 list Found!",
        data: pdf,
    });
});
module.exports = { getTopStudents };