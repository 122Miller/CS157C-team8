const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); //helps avoid CORS issues

const app = express();
const mongoose = require('mongoose');
const courses = require('./api/routes/courses');
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

app.post('/api/world', (req, res) => {
  console.log(req.body);
  res.send(`I received your POST request. This is what you sent me: ${req.body.post}`);
});

const URI =
  'mongodb+srv://spartanplanner:planner2021@cluster0.1plei.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
};

mongoose
  .connect(URI, options)
  .then(() => console.log('Connected to MongoDB...'))
  .catch((err) => console.error('Could not connect to MongoDB...', err));

app.use('/api/courses', courses);

app.listen(port, () => console.log(`Listening on port ${port}`));
