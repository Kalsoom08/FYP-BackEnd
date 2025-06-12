const catchAsync = require('../../Utils/catchAsynch')
const Softwares = require('../../Models/softwaresModel')

const getAllSoftwares = catchAsync(async(req, res)=>{
    const Software = await Softwares.find()
    if(!Software){
    return res.status(404).json({ message: 'Softwares not found' });
  }
  res.status(200).json({ data :  Software });
})

const getSoftwareByName = catchAsync(async(req, res)=>{
    const name = req.params.name;
    const Software = await Softwares.find({name : new RegExp(name, 'i')})
if (Software.length === 0) {
    return res.status(404).json({ message: 'No Software Found on That Name' });
  }
  res.status(200).json({ data: Software });
})

module.exports = {getAllSoftwares, getSoftwareByName}