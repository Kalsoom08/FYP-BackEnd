const Software = require('../../Models/softwaresModel')
const catchAsync = require('../../Utils/catchAsynch')

const uploadSoftware = catchAsync(async(req, res)=>{
  const newSoftware = new Software(req.body);
  await newSoftware.save();
  res.status(201).json(newSoftware);
})


const updateSoftware = catchAsync(async (req, res) => {
  const updated = await Software.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true
    });

  if (!updated) {
    return res.status(404).json({ message: 'Software not found' });
  }
  res.status(200).json({
    message: 'Updated Successfully',
    data: updated
  });});


  const deleteSoftware = catchAsync(async(req, res)=>{
    const deleted = await Software.findByIdAndDelete(req.params.id);
    if(!deleted) return res.status(404).json({ message: 'Software not found' });
  res.status(200).json({ message: 'Deleted successfully' });
  })
module.exports = {uploadSoftware, updateSoftware, deleteSoftware}