const catchAsync = require('../../Utils/catchAsynch')
const Calender = require('../../Models/calenderModel')

const getCalender = catchAsync(async(req, res)=>{
const calender = await Calender.find()
if(calender.length == 0){
    res.status(404).json({
        message: 'No Calender Found'
    })}
else{
    res.status(200).json({ calender });
}})

module.exports = {getCalender}