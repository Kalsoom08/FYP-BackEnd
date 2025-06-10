const mongoose = require('mongoose')

const calenderSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        trim: true,
    },
    type: {
        type: String,
        required: true,
        enum: ['holiday', 'session_start', 'session_end', 'exam_period', 'other'],
        default: 'other',
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    publicID: {
        type: String,
        required: true  
    },
    fileUrl: {
        type: String,
        trim: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

module.exports = mongoose.model('Calender', calenderSchema)