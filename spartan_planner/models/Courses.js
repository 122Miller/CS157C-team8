const mongoose = require('mongoose')
const Schema = mongoose.Schema

const prereqSchema = new Schema ({ name: String});

const courseSchema = new Schema({
    title:{
        type: String,
        required: true
    } ,
    description:{
        type: String,
        required: true
    } ,
    andReq:{
        type: [String],
        required: false
    }, 
    orReq: {
        type: [String],
        required: false
    }, 
    units:{
        type: Number,
        required: true
    },
    link:{
        type: String,
        required: false
    }
})

 
module.exports = mongoose.model('Course', courseSchema)