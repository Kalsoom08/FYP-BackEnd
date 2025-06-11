const mongoose = require('mongoose')

const registrationSchema = new mongoose.Schema({
    regNumber :{
        type: String, 
        required: true,
        unique: true
    },
    isRegistered : {
        type : Boolean 
    },
    remarks: {
        type: String,
        default : ''
    },
    createdAt : {
        type : Date,
        default : Date.now
    }
})

module.exports = mongoose.model('Registration', registrationSchema)