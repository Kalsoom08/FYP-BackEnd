const mongoose = require('mongoose')

const softwareSchema = new mongoose.Schema({
    name:{
        type : String,
        required: true
    },
    version: {
        type : String,
        required : true
    },
    platforms: {
        type : [String],
        enum : ["Windows", "Mac", "Linux"],
        required : true
    },
    downloadFileUrl : {
        type: String, 
        required: true
    },
    description : {
        type : String
    },
    createdAt : {
        type : Date,
        default :Date.now
    }  
})

module.exports = mongoose.model('Software', softwareSchema)