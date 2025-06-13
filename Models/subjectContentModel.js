const mongoose = require('mongoose')

const subjectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description : {
        type : String
    },
    semester : { 
        type: String, 
        required: true,
    },
    fileUrl : {
        type: String,
        required : true
    }, 
    publicId : {
        type: String,
        required : true
    },    
    createdAt : {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Subject', subjectSchema )