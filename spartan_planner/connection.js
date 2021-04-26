const router = require('express').Router();
const mongoose = require('mongoose');
const course = mongoose.model('Course')


router.get('/:course', (req, res, next) => {
    course
        .find({course: req.body})
        .then((user) => {
            if(!user)
                return res.sendStatus(401);
            else    
                return res.send(user);
        }).catch(next);
});
    













// const courseSchema = new mongoose.Schema({
//     course: String,
//     title: String,
//     dept_name: String,
//     credit: Number,
//     description: String,
//     prerequisite: [ String ]
// })
  
