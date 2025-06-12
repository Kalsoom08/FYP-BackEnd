const mongoose = require('mongoose');

const campusMapSchema = new mongoose.Schema({
        mapUrl: {
            type: String,
            required: true,
        },
        publicId: {
            type: String,
            required: true,
        },
}, { timestamps: true } );

module.exports = mongoose.model('CampusMap', campusMapSchema);