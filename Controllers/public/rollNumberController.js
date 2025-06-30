const RollNumber = require('../../Models/rollNumberModel');
const catchAsync = require('../../Utils/catchAsynch');

const getAllRollNumbers = catchAsync(async (req, res) => {
  const rollNumbers = await RollNumber.find();
  res.status(200).json({ rollNumbers });
});

const getRollNumberByName = catchAsync(async (req, res) => {
  const { name, department } = req.params;

  const rollNumbers = await RollNumber.find({
    name: new RegExp(name, 'i'),
    department: new RegExp(department, 'i')
  });

  if (rollNumbers.length === 0) {
    return res.status(404).json({ message: 'No roll numbers found for that name and department' });
  }

  res.status(200).json({ count: rollNumbers.length, data: rollNumbers });
});

module.exports = { getAllRollNumbers, getRollNumberByName };
