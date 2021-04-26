const mongoose = require('mongoose');
const {courseSchema} = require('./course');

const Requirement = mongoose.model('Requirement', courseSchema);
exports.Requirement = Requirement;



