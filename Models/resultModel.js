const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
    rollNumber: { type: String, required:true, index: true },
    name: { type: String, required: true },
    fatherName: { type: String, required: true },
    semester: { type: String, required: true },
    department: { type: String, required: true},
    section: { type: String },
    gpa: { type: Number },
    cgpa: { type: Number },
    dmcPdfUrl: { type: String },
    failPapers: [{ type: String }],
    absent: { type: Boolean, default: false },
},
  { timestamps: true });

  module.exports = mongoose.model('Result', resultSchema);