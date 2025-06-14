const mongoose = require("mongoose");

const hallStatementSchema = new mongoose.Schema({
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
    required: true,
  },
  publicId: {
    type: String,
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model("HallStatement", hallStatementSchema);
