const mongoose = require('mongoose');

const timeTableSchema = new mongoose.Schema({
    department: {
        type: String,
        required: true
    },
    semester: {
        type: String,
        required: true
    },
    section: {
        type: String,
        required: true
    },
    fileUrl: {
        type: String,
        required: true
    },
    publicId: {
        type: String,
        require: true
    },
}, 
   { 
    timestamps: true 
});

module.exports = mongoose.model('TimeTable', timeTableSchema);