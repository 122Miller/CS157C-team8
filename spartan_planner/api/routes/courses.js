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

  const arr = [requirements, deeps, electives];

  res.send(arr); // [requirements_collection, deepCourses_collection, electives_collection]
});

/**
 * Get all courses that are belong to category `deep-course`
 */
router.get('/deepCourses', async (req, res) => {
  const deeps = await Course.find({ category: 'deep-course' }).select('-_id -__v');
  res.send(deeps);
});

/**
 * Get all courses that are belong to category `requirement`
 */
router.get('/requirements', async (req, res) => {
  const requirements = await Course.find({ category: 'requirement' }).select('-_id -__v');
  res.send(requirements);
});

/**
 * Get all courses that are belong to category `elective`
 */
router.get('/electives', async (req, res) => {
  const electives = await Course.find({ category: 'elective' }).select('-_id -__v');
  res.send(electives);
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
