const mongoose = require('mongoose')

const rollNumberModel = new mongoose.Schema({
    name:
    {   
        type : String, 
        required : true
    },
    classNumber:{
        type : String,
        required : true
    },
    department:{
        type : String,
        required : true
    },
    semester:{
        type : String,
        required : true 
    },
    section:{
        type : String,
    }
})

module.exports = mongoose.model('RollNumber', rollNumberModel)