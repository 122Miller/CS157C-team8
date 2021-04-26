const mongoose = require('mongoose');
const {courseSchema} = require('./course');

const DeepCourse = mongoose.model('DeepCourse', courseSchema);
exports.DeepCourse = DeepCourse;



