// app.js
const express = require('express')
const app = express()
const port = process.env.PORT || 5000
const cors = require('cors');

// Defining external routes 
const AnalyticRoute = require('./routes/AnalyticRoute.js');
const DisplayStatisticsRoute = require('./routes/DisplayStatisticsRoute.js');
const InputParseRoute = require('./routes/InputParseRoute.js');

const {connection} = require('./utils/connectionDB.js')
const {countRepeatedWords} = require('./utils/ExtractTechnicalWord.js');

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const dotenv = require('dotenv');



if (!process.env.DEVELOPMENT) {
  dotenv.config({ path: './../.env' });
}

app.use(express.json());

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))


app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, DELETE");
  next();
});

app.get('/', (req, res) => {
  res.send('Hello World! v3.1')
});

app.use('/api/stats', DisplayStatisticsRoute);
app.use('/api/input', InputParseRoute);
app.use('/api/analytics', AnalyticRoute);


app.delete('/delete-post', async (req, res) => {
  // console.log(req.body);
  const { companyName, jobTitle, companyLocation, dateOfSubmission, companyURL } = req.body;
  let conn;
  try {
    conn = await connection();
  } catch (error) {
    console.error('error occurred during delete-post');
    console.error("connection:", conn);
    res.status(400).send("Connection with db failed");
  }
  try {
    const collection = await conn.db("company").collection("information");
    const query = {
      companyName,
      jobTitle,
      companyLocation,
      dateOfSubmission,
      companyURL
    }
    const result = await collection.deleteOne(query);
    if (result.deletedCount === 1) {
      console.log("Successfully delete:", companyName, jobTitle);
    } else {
      console.log("No documents matched the query. Deleted 0 documents.");
    }
  } catch (error) {
    console.error('error occurred during deleting from database')
    res.status(403).send("Deletion in DB rejected");
  }

  res.send("Delete process succesful");
});

// Correct time generated from JS Date Object
// Format to yyyy-mm-dd
app.get("/updateTime", async (req, res) => {
  let conn;
  try {
    conn = await connection();
  } catch (error) {
    console.error('error occurred during delete-post');
    console.error("connection:", conn);
    res.status(400).send("Connection with db failed");
  }

  try {
    const collection = await conn.db("company").collection("information");

    const cursor = collection.find({}, {});
    if ((await collection.countDocuments({})) === 0) {
      console.log("No documents found!");
    }
    for await (const doc of cursor) {

      const filter = { _id: doc._id }
      const updateDoc = {
        $set: {
          dateOfSubmission: doc.dateOfSubmission.split('T')[0]
        }
      }
      const foundDoc = await collection.updateOne(filter, updateDoc, {})
      console.log(foundDoc);
    }
    res.send("Called Time");
  } catch (error) {
    console.error(error);
  }
});


app.get("/updateDate", async (req, res) => {
  let conn;
  try {
    conn = await connection();
  } catch (error) {
    console.error('error occurred during delete-post');
    console.error("connection:", conn);
    res.status(400).send("Connection with db failed");
  }

  try {
    const collection = await conn.db("company").collection("information");

    const cursor = collection.find({}, {});
    if ((await collection.countDocuments({})) === 0) {
      console.log("No documents found!");
    }
    for await (const doc of cursor) {

      let  [month, day, year] = doc.dateOfSubmission.split('/');
      if (month === '1'){
        month = '01';
      }

      if (year === '2025'){
        day = '0' + day[0];
      }
      // console.log(doc.companyName, year + '/' + month + '/' + day );
      const filter = { _id: doc._id }
      const updateDoc = {
        $set: {
          dateOfSubmission: year + '/' + month + '/' + day,
        }
      }
      const foundDoc = await collection.updateOne(filter, updateDoc, {})
      console.log(foundDoc);
    }
    res.send("Called Time");
  } catch (error) {
    console.error(error);
  }
});


app.post('/update-info', async (req, res) => {
  const { userInput, jobTitle, companyName, companyLocation, dateOfSubmission, companyURL, documentID } = req.body;
  const wordMap = countRepeatedWords(userInput);
  let conn;
  try {
    if (!conn || conn === null) {
      conn = await connection();
    }

    const query = {_id: ObjectId.createFromHexString(documentID)}
    const updateValues = {
      $set: {
        companyName: companyName,
        jobTitle: jobTitle,
        companyLocation: companyLocation,
        dateOfSubmission: dateOfSubmission,
        companyURL: companyURL,
        wordMap: wordMap,
        userInput: userInput,
      }
    }
    let collection = await conn.db("company").collection('information');
    let result = await collection.updateOne(query, updateValues);
    console.log("Update document:", result);
  } catch (error) {
    console.error("ERROR OCCURRED DURING PARSE - UPDATE-INFO", error);
  }
  res.send(wordMap);
});

app.post('/update-notes', async (req, res) => {
  const {documentID, userNotes} = req.body;
  let conn;
  try {
    if (!conn || conn === null) {
      conn = await connection();
    }

    const query = {_id: ObjectId.createFromHexString(documentID)}
    const notesValues ={
      $set: {
        notes: userNotes,
      }
    }
    let collection = await conn.db("company").collection('information');
    let result = await collection.updateOne(query, notesValues);

    console.log("Update document:", result);
  } catch (error) {
    console.error("Error occurred during notes submit", error);
    res.status(400).send("Error occurred during notes submit", error);
  }
  res.send(userNotes);
});

