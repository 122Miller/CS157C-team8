const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); //helps avoid CORS issues 

const app = express();
const port = process.env.PORT || 5000;

const MongoClient = require('mongodb').MongoClient;
const { connect } = require('mongodb');

const mongoose = require('mongoose')

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

app.post('/api/world', (req, res) => {
  console.log(req.body);
  res.send(
    `I received your POST request. This is what you sent me: ${req.body.post}`,
  );
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})


app.listen(port, () => console.log(`Listening on port ${port}`));


var uri = "mongodb+srv://spartan:sjsu@cluster0.pdfct.mongodb.net/test?retryWrites=true&w=majority";
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};

MongoClient.connect(uri, options).then(client => {
  console.log("Database connection established");
  const db = client.db('star-wars-quotes')
  const quotesCollection = db.collection('quotes')

  app.post('/quotes', (req, res) => {
    quotesCollection.insertOne(req.body)
      .then(result => {
        console.log(result)
      })
      .catch(error => console.error(error))
  })

},
err => {
  {
    console.log("Error connectiong database instance due to: ", err);
  }
});

