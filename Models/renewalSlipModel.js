const mongoose = require('mongoose');

const renewalSlipSchema = new mongoose.Schema({
    classNo: {
        type: String,
        required: true,
    },
    department: {
        type: String,
        required: true
    },
    semester: {
        type: String,
        required: true
    },
    pdfUrl: {
        type: String,
        required: true
    },
    publicId: {
        type: String,
        required: true
    }
}, { timestamps: true } );
const RenewalSlip = mongoose.model('RenewalSlip', renewalSlipSchema);
module.exports = RenewalSlip;