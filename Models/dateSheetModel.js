const mongoose = require('mongoose');

const dateSheetSchema = new mongoose.Schema({
    department: {
        type: String,
        required: true
    },
    semester: {
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
module.exports = mongoose.model('DateSheet', dateSheetSchema);