const HallStatement = require('../../Models/hallStatmentModel.js');
const catchAsync = require('../../Utils/catchAsynch.js');

const getHallStatement = catchAsync(async (req, res) => {
  const { department, semester } = req.query;

  if (!department || !semester) {
    return res.status(400).json({ message: "Department and Semester are required" });
  }

  const hallStatement = await HallStatement.findOne({ department, semester });

  if (!hallStatement) {
    return res.status(404).json({ message: "Hall Statement not found for this semester & department" });
  }

  res.status(200).json({
    message: "Hall Statement retrieved",
    data: hallStatement,
  });
});
module.exports = { getHallStatement };