const mongoose = require('mongoose');

const topStudentSchema = new mongoose.Schema({
    department: {
        type: String,
        required: true,
    },
    semester: {
        type: String,
        required: true,
    },
    pdfUrl: {
        type: String,
        required: true
    },
    publicId: {
        type: String,
        required: true,
    },

}, { timestamps: true }
);
const TopStudents = mongoose.model('TopStudents', topStudentSchema);
module.exports = TopStudents;