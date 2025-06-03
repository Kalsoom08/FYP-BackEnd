const mongoose = require('mongoose')

const notificationSchema = new mongoose.Schema({
    title :{
        type : String,
        required: true
    }, 
    description : {
        type : String,
        required: true
    },
    type : {
        type :String,
        enum : ['exams', 'events', 'circular'],
        required : true
    },
        fileUrl: {
        type: String,
        required: true
    },
    },
    {
        timestamps : true
    }
)

module.exports = mongoose.Model('Notifications', notificationSchema)