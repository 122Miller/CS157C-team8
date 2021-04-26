const mongoose = require('mongoose');
const {courseSchema} = require('./course');

const Elective = mongoose.model('Elective', courseSchema);
exports.Elective = Elective;



