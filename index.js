const express = require('express');
const app = express();
const ObjectId = require('mongodb').ObjectID;
const MongoClient = require('mongodb').MongoClient;
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const port = 5000

app.use(cors());
app.use(bodyParser.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.pnj3g.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  console.log('err', err)
  const foodCollection = client.db("foodVillage").collection("foodCollection");
  const bookingCollection = client.db("foodVillage").collection("bookingCollection");

  console.log("db connected");

  app.post('/addFood', (req, res) => {
    const food = req.body;
    console.log(food);
    foodCollection.insertOne(food)
      .then(result => {
        res.send(result.insertedCount)
      })
  })
  //home
  app.get('/food', (req, res) => {
    foodCollection.find({})
      .toArray((err, documents) => {
        res.send(documents);
      })
  })
  //booking list
  app.post('/addBooking', (req, res) => {
    const booking = req.body;
    console.log(booking);
    bookingCollection.insertOne(booking)
      .then(result => {
        res.send(result.insertedCount)
      })
  })
  //booking list
  app.get('/allBooking', (req, res) => {
    bookingCollection.find({})
      .toArray((err, documents) => {
        res.send(documents);
      })
  })
  // my rent 
  app.get('/rentDetails', (req, res) => {
    bookingCollection.find({ email: req.query.email })
      .toArray((err, documents) => {
        res.send(documents);
      })
  })


  app.get('/', (req, res) => {
    res.send('food village!')
  })

});

app.listen(process.env.PORT || port)