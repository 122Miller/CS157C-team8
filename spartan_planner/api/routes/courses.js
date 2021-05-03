const express = require('express');
const _ = require('lodash');
const router = express.Router();
const { Course, validate, courseSchema } = require('../models/course');

/**
 * Get all three category of courses in order of [requirement collection, deep-course collection, elective collection]
 */
router.get('/', async (req, res) => {
  const courses = await Course.find().select('-_id -__v');
  const deeps = _.filter(courses, { category: 'deep-course' });
  const requirements = _.filter(courses, { category: 'requirement' });
  const electives = _.filter(courses, { category: 'elective' });
  const ge = _.filter(courses, { category: 'GE' });

  const arr = [requirements, electives, deeps, ge];

  res.send(arr); // [requirements_collection, deepCourses_collection, electives_collection, GE]
});

/**
 * Get a specific course with a given course_name
 * Ex: /course/CS146
 */
router.get('/:course', async (req, res) => {
  const course = await Course.find({ course: req.params.course });
  if (!course) return res.status(404).send('Course not found');
  res.send(course);
});

/**
 * Get all courses based on given category
 * Ex: /course/category/deep-course
 */
router.get('/category/:category', async (req, res) => {
  const courses = await Course.find({ category: req.params.category });
  res.send(courses);
});

router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.message);

  const exist = await Course.findOne({ course: req.body.course });
  if (exist) return res.status(400).send('Course already registered');

  const course = new Course({
    course: req.body.course,
    title: req.body.title,
    dept_name: req.body.dept_name,
    credit: req.body.credit,
    url: req.body.url,
    category: req.body.category,
    description: req.body.description,
    prerequisite: req.body.prerequisite,
  });
  try {
    const result = await course.save();
    res.send(result);
  } catch (ex) {
    res.status(500).send('Failed to register course'); // Don't remember what status this should be ...
  }
});

router.delete('/:course', async (req, res) => {
  const findCourse = await Course.findOneAndDelete({
    course: req.params.course,
  });
  if (!findCourse) return res.status(404).send('Course was not found');
  res.send(findCourse);
});

router.put('/:course', async (req, res) => {
  const findCourse = await Course.findOneAndUpdate({ course: req.params.course }, req.body, {
    new: true,
  });
  if (!findCourse) return res.status(404).send('Course was not found');
  res.send(findCourse);
});

module.exports = router;
