// app.js
const express = require('express')
const app = express()
const port = process.env.PORT || 5000
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const dotenv = require('dotenv');



if (!process.env.DEVELOPMENT) {
  dotenv.config({ path: './../.env' });
}

app.use(express.json());


app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, DELETE");
  next();
});

const STOPWORDS = ['i', 'me', 'my', 'myself', 'we', 'our', 'ours', 'ourselves', 'you', 'your', 'yours', 'yourself', 'yourselves', 'he', 'him',
  'his', 'himself', 'she', 'her', 'hers', 'herself', 'it', 'its', 'itself', 'they', 'them', 'their', 'theirs', 'themselves', 'what', 'which',
  'who', 'whom', 'this', 'that', 'these', 'those', 'am', 'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'having', 'do',
  'does', 'did', 'doing', 'a', 'an', 'the', 'and', 'but', 'if', 'or', 'because', 'as', 'until', 'while', 'of', 'at', 'by', 'for', 'with', 'about',
  'against', 'between', 'into', 'through', 'during', 'before', 'after', 'above', 'below', 'to', 'from', 'up', 'down', 'in', 'out', 'on', 'off',
  'over', 'under', 'again', 'further', 'then', 'once', 'here', 'there', 'when', 'where', 'why', 'how', 'all', 'any', 'both', 'each', 'few', 'more',
  'most', 'other', 'some', 'such', 'no', 'nor', 'not', 'only', 'own', 'same', 'so', 'than', 'too', 'very', 's', 't', 'can', 'will', 'just', 'don',
  'should', 'now'
];

const LANGAUGES = ['python', 'c', 'java', 'react', 'reactjs', 'javascript', 'typescript', 'php', 'ruby', 'swift', 'r', 'html', 'css',
  'html5', 'git', 'vuejs', 'vue', 'angularjs', 'angular', 'nodejs', 'node', 'tailwind', 'j2ee', 'playwright', 'bootstrap', 'foundation',
  'materialize', 'rust', 'css3', 'obj', 'go', 'scala'
]

const DATABASES = ['nosql', 'mysql', 'postgresql', 'postgres', 'mongodb', 'cassandra', 'spark', 'sparks', 'sql', 'sqlite', 'msql', 'databricks',
  'databrick', 'azure', 'redis', 'apache', 'amazon', 'dynamodb', 'dynamo', 'couchbase', 'neo4j', 'graphql', 'aurora', 'rds', 'eks',
  'mssql', 'oracle', 'cloud', 'gcp', 'kafka', 'pinot', 'redshift',]

const METHODOLOGY = ['agile', 'scrum', 'sdlc', 'qa', 'seo',]

const OTHERS = ['rest', 'restful', 'restfuls', 'api', 'apis', 'xml', 'json', 'aws', 'microservices', 'microservice', 'spring', 'boot',
  'django', 'flask', 'ec2', 'ci', 'cd', 'cicd', 'vpc', 's3', 'jquery', 'ajax', 'etl', 'tomcat']

const TOOLS = ['postman', 'jira', 'selenium', 'docker', 'kubernetes', 'kubernete', 'lambda', 'devops', 'devop', 'terraform',
  'cloudformation', 'bash', 'linux', 'macos', 'unix', 'windows', 'macintosh', 'ansible', 'jest', 'mocha', 'informatica', 'tabkeau',
  'circleci', 'snowflake']


app.get('/', (req, res) => {
  console.log("WORKS");
  res.send('Hello World! v2.0')
});

const connectionString = process.env.ATLAS_URI || "";
const client = new MongoClient(connectionString);

// let conn;

async function connection() {
  try {
    let conn = await client.connect();
    return conn;
  } catch (e) {
    console.error(e);
  }
}
connection();

function countRepeatedWords(sentence) {

  let words = sentence
    .toLowerCase()
    .replace(/[/,]/g, ' ')
    .replace(/[^\w\s/]/g, '')
    .split(/\s/)
    .filter(word => relevantKeyword(word));

  let wordMap = {};
  // console.log(sentence.toLowerCase().replace(/[/]/g, ' ').replace(/[^\w\s]/g, ''));
  for (let i = 0; i < words.length; i++) {
    if (words[i] === '') {
      continue;
    }
    let currentWordCount = wordMap[words[i]];
    let count = currentWordCount ? currentWordCount : 0;
    wordMap[words[i]] = count + 1;
  }
  return wordMap;
}

function relevantKeyword(word) {

  return !STOPWORDS.includes(word) &&
    (LANGAUGES.includes(word) || DATABASES.includes(word) || METHODOLOGY.includes(word) || OTHERS.includes(word) || TOOLS.includes(word));
}

// Parse the user's input and store in the database
app.get('/parse', async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");

  const { userInput, jobTitle, companyName, companyLocation, dateOfSubmission, companyURL } = req.query;
  const wordMap = countRepeatedWords(userInput);
  let conn;
  try {
    if (!conn || conn === null) {
      conn = await connection();
    }
    let collection = await conn.db("company").collection('information');
    let results = await collection.insertOne({ companyName, jobTitle, companyLocation, dateOfSubmission, companyURL, wordMap, userInput })
  } catch (error) {
    console.error("ERROR OCCURRED DURING PARSE", error);
  }
  res.send(wordMap);
});


async function retrieveAllStatistics() {
  let collection;
  let conn;
  try {
    if (!conn || conn === null) {
      conn = await connection();
    }
    collection = await conn.db("company").collection('information');
  } catch (error) {
    console.error("Error 1", conn);
    console.error("Error 2", connectionString);
    console.error("Error 3", client);
    console.error("ERROR OCCURRED DURING POST 4", error);
  }
  const agg = [
    {
      '$project': {
        '_id': 1,
        "companyName": 1,
        "jobTitle": 1,
        "companyLocation": 1,
        "dateOfSubmission": 1,
        "companyURL": 1,
        "wordMap": 1,
        "userInput": 1,
      }
    }
  ];

  let data = await collection.aggregate(agg).toArray();
  let totalMap = {}
  let totalCompany = []
  for (let i = 0; i < data.length; i++) {
    let currentData = data[i]
    const relevantInformation = {
      companyName: currentData.companyName,
      jobTitle: currentData.jobTitle,
      companyLocation: currentData.companyLocation,
      dateOfSubmission: currentData.dateOfSubmission,
      companyURL: currentData.companyURL,
      userInput: currentData.userInput,
      documentID: currentData._id,
    }
    totalCompany.push(relevantInformation);
    for (const [key, value] of Object.entries(currentData.wordMap)) {
      let currentWordCount = totalMap[key]
      let count = currentWordCount ? currentWordCount : 0;
      totalMap[key] = count + value

    }
  }
  const sortedDict = Object.fromEntries(
    Object.entries(totalMap).sort(([, a], [, b]) => b - a)
  );
  return { sortedDict, length: data.length, relevantInformation: totalCompany };
}

// Retrieve all documents but only keeping the wordMap
app.post('/global-statistics', async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.send(await retrieveAllStatistics());
});

app.get('/global-statistics', async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.send("This is the global-statistics-page")
});

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

app.post('/display-data-pie', async (req, res) => {
  const statistics = await retrieveAllStatistics();
  const mapOfRelevantKeywords = statistics.sortedDict;

  let labels = [], dataCounts = [];
  let others = 'others', freq = 0;
  for (const keyword of Object.keys(mapOfRelevantKeywords)) {
    if (mapOfRelevantKeywords[keyword] > 6) {
      labels.push(keyword)
      dataCounts.push(mapOfRelevantKeywords[keyword]);
    } else {
      // others.push(keyword)
      freq = freq + mapOfRelevantKeywords[keyword];
    }
  }

  labels.push(others);
  dataCounts.push(freq);

  res.send({ labels, dataCounts });
});


app.post('/display-data-line', async (req, res) => {
  const statistics = await retrieveAllStatistics();
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
    const { start, range, end } = await getRangeOfDates(collection);

    const labels = [], dataPoints = new Array(range + 1).fill(0);

    // Labels: [start, end] inclusive
    for (let i = 0; i < range + 1; i++) {
      const currentDate = new Date();
      const nextDate = new Date(currentDate.setDate(start.getDate() + i));
      const date = nextDate.toISOString().split('T')[0]
      labels.push(date);
    }


    for (const key in statistics.relevantInformation) {
      const docDate = statistics.relevantInformation[key].dateOfSubmission
      dataPoints[getDaysDifference(start, new Date(docDate))]++;
    }

    // console.log(dataPoints);
    const startDateString = start.toISOString().split('T')[0]
    const endDateString = end.toISOString().split('T')[0]
    res.send({ labels, dataPoints, startDateString, endDateString });
  }
  catch (error) {
    console.error("Error with display-data-line ---", error);
  }
});
async function getRangeOfDates(collection) {
  const query = {}
  const maximum = {
    sort: { "dateOfSubmission": -1 },
    projection: { _id: 0, 'dateOfSubmission': 1 }
  }
  const minimum = {
    sort: { "dateOfSubmission": 1 },
    projection: { _id: 0, 'dateOfSubmission': 1 }
  }
  const maximumDate = new Date((await collection.findOne(query, maximum)).dateOfSubmission);
  const minimumDate = new Date((await collection.findOne(query, minimum)).dateOfSubmission);

  return { start: minimumDate, range: getDaysDifference(minimumDate, maximumDate), end: maximumDate }
};
function getDaysDifference(date1, date2) {
  const diffInMilliseconds = date2.getTime() - date1.getTime();
  const millisecondsPerDay = 1000 * 60 * 60 * 24;
  return Math.round(diffInMilliseconds / millisecondsPerDay);
};

app.post('/update-info', async (req, res) => {
  const { userInput, jobTitle, companyName, companyLocation, dateOfSubmission, companyURL, documentID } = req.body;
  const wordMap = countRepeatedWords(userInput);
  let conn;
  try {
    if (!conn || conn === null) {
      conn = await connection();
    }

    const query = {_id: new ObjectId(documentID)}
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
    // console.log("PASSED");
    let result = await collection.updateOne(query, updateValues);
    // console.log(documentID);
    // let result = await collection.findOne(query);
    console.log("Update document:", result);
  } catch (error) {
    console.error("ERROR OCCURRED DURING PARSE - UPDATE-INFO", error);
  }
  res.send(wordMap);
});

// Handling shutdown server
// Error Handling
process.on("SIGINT", async () => {
  try {
    await client.close();     // Close MongoDB connection
    console.log("MongoDB server closed successfully");
    process.exit(0);      // No Error Exit
  } catch (error) {
    console.log("Error occurred during shutdown");
    process.exit(1);    // Fatal Error Exit
  }
});
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
