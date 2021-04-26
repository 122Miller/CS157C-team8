const express = require('express');
const app = express();
const mongoose = require('mongoose');
const courses = require('./api/routes/courses');
const electives = require('./api/routes/electives');
const requirements = require('./api/routes/requirements');
const deepCourses = require('./api/routes/deepCourses');
const port = process.env.PORT || 5000;

const URI2 = 'mongodb+srv://spartanplanner:planner2021@cluster0.1plei.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
};

mongoose.connect(URI2, options)
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/courses', courses);
app.use('/api/electives', electives);
app.use('/api/requirements', requirements);
app.use('/api/deepCourses', deepCourses);

app.listen(port)

