const express = require('express');
const router = express.Router();
const { Elective } = require('../models/elective');
const { validate } = require('../models/course');

router.get('/', async (req, res) => {
    const courses = await Elective.find().select('course -_id');
    res.send(courses);
})

router.get('/:courseName', async(req, res) => {
    const course = await Elective.findOne({ course: req.params.courseName }).select('-_id');
    if(!course) return res.status(404).send('Course not found');
    res.send(course);
})

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.message)

    const exist = await Elective.findOne({ course: req.body.course });
    if(exist) return res.status(400).send('Course already registered');

    const course = new Elective({
        course: req.body.course,
        title: req.body.title,
        dept_name: req.body.dept_name,
        credit: req.body.credit,
        description: req.body.description,
        prerequisite: req.body.prerequisite
    })
    try {
        const result = await course.save();
        res.send(result);
    } catch (ex) {
        res.status(500).send('Failed to register course')  // Don't remember what status this should be ...
    }
})

router.delete('/:course', async(req, res) => {
    const findCourse = await Elective.findOneAndDelete({course: req.params.course})
    if(!findCourse) return res.status(404).send('Course was not found')
    res.send(findCourse)
})

router.put('/:course', async(req, res) => {
    const findCourse = await Elective.findOneAndUpdate({ course: req.params.course }, req.body, {new: true})
    if(!findCourse) return res.status(404).send('Course was not found')
    res.send(findCourse)
})


module.exports = router;