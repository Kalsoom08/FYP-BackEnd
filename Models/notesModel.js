const mongoose = require('mongoose')

const notesSchema = new mongoose.Schema({
    subject : {
        type : String,
        required : true
    }, 
    semester : {
        type : String, 
    },
    department: {
        type: String,
    },
    fileUrl: {
        type: String,
        required: true 
    },
    publicId: {
        type: String,
        required: true 
    },
    uploadedAt: {
        type: Date,
        default: Date.now
    }

})


module.exports = mongoose.model('Notes', notesSchema)