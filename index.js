const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv').config()
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.4zvck.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;




const port = 3001

app.use(cors());
app.use(bodyParser.json());





const client = new MongoClient(uri, { useNewUrlParser: true , useUnifiedTopology: true });
client.connect(err => {
  const workersCollection = client.db("volunteerNetwork").collection("workers");
  const tasksCollection = client.db("volunteerNetwork").collection("tasks");
  const eventsCollection = client.db("volunteerNetwork").collection("events");
  
  // Workers Related Codes

  app.post("/addUser",(req,res)=>{
    const newUser = req.body;
    workersCollection.insertOne(newUser)
    .then(result => {
      res.send(result.insertedCount>0);
    })
  })
  app.get('/users',(req,res)=>{
    workersCollection.find({email:req.query.email})
    .toArray((err,documents)=>{
      res.send(documents);
    })
  })
  app.get('/allUsers',(req,res)=>{
    workersCollection.find({})
    .toArray((err,documents)=>{
      res.send(documents);
    })
  })
  app.delete('/delete/:taskId',(req, res) => {
    workersCollection.deleteOne({_id: ObjectId(req.params.taskId)})
    .then(result => {
      console.log(result);
      res.send( result.deletedCount>0);
    })
  })
  app.delete('/deleteWorker/:workerTaskId',(req, res) => {
    workersCollection.deleteOne({_id: ObjectId(req.params.workerTaskId)})
    .then(result => {
      console.log(result);
      res.send( result.deletedCount>0);
    })
  })
  // Workers Related Codes End Here


  //Tasks Related Codes
  
  app.get('/allTasks',(req,res)=>{
    tasksCollection.find({})
    .toArray((err,documents)=>{
      res.send(documents);
    })
  })
  //Tasks Related Codes End Here
 

  // Events Related Codes
  app.post("/addEvent",(req,res)=>{
    const newEvent = req.body;
    eventsCollection.insertOne(newEvent)
    .then(result => {
      res.send(result.insertedCount>0);
    })
  })
  app.get('/allEvents',(req,res)=>{
    eventsCollection.find({})
    .toArray((err,documents)=>{
      res.send(documents);
    })
  })
  // Events Related Codes End Here


});


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port);