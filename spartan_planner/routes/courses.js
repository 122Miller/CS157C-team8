const express = require("express");
const router = express.Router();
const Course = require("../models/Courses");

// Get All Route
router.get("/", async (req, res) => {
 try{
     const courses = await Course.find()
     res.json(courses)
 } catch (err){
     res.status(500).json({message: err.message})
 }
}); 

// Get One Route
router.get("/:id", async (req, res) => {
// Rest of the code will go here
}); 
// Create One Route
router.post("/", async (req, res) => {
    const course = new Course({
        title: req.body.title,
        description: req.body.description,
        andReq: req.body.andReq,
        orReq: req.body.orReq,
        units: req.body.units
    });
    try {
        const newCourse = await course.save();
        res.status(201).json({ newCourse });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});
// Edit One Route PUT version
//Put One
router.put("/:id", getCourse, async (req, res) => {
    try {
      const updatedCourse = await res.course.set(req.body);
      res.json(updatedCourse);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });



//Delete One
router.delete("/:id", getCourse, async (req, res) => {
  try {
    await res.course.deleteOne();
    res.json({ message: "Course has been deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getCourse(req, res, next) {
    let course;
    try {
      course = await Course.findById(req.params.id);
      if (course == null) {
        return res.status(404).json({ message: "Cannot find Course" });
      }
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
    res.course = course;
    next();
  }
  
module.exports = router;