const express = require('express');
const router = express.Router();
const { Course, validate } = require('../models/course');
const { Requirement } = require('../models/requirement');
const { DeepCourse } = require('../models/deepCourse');
const { Elective } = require('../models/elective');

router.get('/', async (req, res) => {
    const requirements = await Requirement.find().select('-_id -__v');
    const deepCourses = await DeepCourse.find().select('-_id -__v');
    const electives = await Elective.find().select('-_id -__v');

    var arr = new Array(3);
    arr[0] = requirements;
    arr[1] = deepCourses;
    arr[2] = electives

    res.send(arr);  // [requirements_collection, deepCourses_collection, electives_collection]
})

module.exports = router;

/*
router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.message)

    const exist = await Course.findOne({ course: req.body.course });
    if(exist) return res.status(400).send('Course already registered');

    const course = new Course({
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
    const findCourse = await Course.findOneAndDelete({course: req.params.course})
    if(!findCourse) return res.status(404).send('Course was not found')
    res.send(findCourse)
})

router.put('/:course', async(req, res) => {
    const findCourse = await Course.findOneAndUpdate({ course: req.params.course }, req.body, {new: true})
    if(!findCourse) return res.status(404).send('Course was not found')
    res.send(findCourse)
})
*/

// course: Joi.string().required(),
//         title: Joi.string().required(),
//         dept_name: Joi.string().required().minlength(2),
//         description: Joi.string().required(),
//         prerequisite: Joi.object({
//             and: Joi.array(Joi.string()).required(),
//             or: Joi.array(Joi.string()).required()
//         })