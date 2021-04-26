const mongoose = require('mongoose');
const Joi = require('joi');

const courseSchema = mongoose.Schema({
  course: {
    type: String,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  dept_name: {
    type: String,
    required: true,
    minlength: 2,
  },
  credit: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: ['deep-course', 'elective', 'requirement'],
  },
  prerequisite: {
    type: [String],
    required: true,
  },
});

function validateCourse(course) {
  const schema = Joi.object({
    course: Joi.string().required(),
    title: Joi.string().required(),
    dept_name: Joi.string().min(2).required(),
    credit: Joi.number().required(),
    description: Joi.string().required(),
    category: Joi.string().required().valid('deep-course', 'elective', 'requirement'),
    prerequisite: Joi.array().items(Joi.string()).required(),
  });
  return schema.validate(course);
}
const Course = mongoose.model('Course', courseSchema);
exports.Course = Course;
exports.courseSchema = courseSchema;
exports.validate = validateCourse;

// //   course: String,
// //   title: String,
// //   dept_name: String,
// //   credit: Number,
// //   description: String,
// //   prerequisite: [ String ]
