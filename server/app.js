// app.js
const express = require('express')
const app = express()
const port = process.env.PORT || 5000
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const dotenv = require('dotenv');
// dotenv.config({path: './../.env'});

// app.use(cors());

// app.use(cors({
//     origin: 'http://localhost:3000', // Replace with your allowed origin
//     methods: ["GET", "POST"],
// }));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  next();
});

const STOPWORDS = ['i','me','my','myself','we','our','ours','ourselves','you','your','yours','yourself','yourselves','he','him',
    'his','himself','she','her','hers','herself','it','its','itself','they','them','their','theirs','themselves','what','which',
    'who','whom','this','that','these','those','am','is','are','was','were','be','been','being','have','has','had','having','do',
    'does','did','doing','a','an','the','and','but','if','or','because','as','until','while','of','at','by','for','with','about',
    'against','between','into','through','during','before','after','above','below','to','from','up','down','in','out','on','off',
    'over','under','again','further','then','once','here','there','when','where','why','how','all','any','both','each','few','more',
    'most','other','some','such','no','nor','not','only','own','same','so','than','too','very','s','t','can','will','just','don',
    'should','now'
];

const LANGAUGES = ['python', 'c', 'java', 'react', 'reactjs', 'javascript', 'typescript','php', 'ruby', 'swift', 'r', 'html', 'css',
     'html5', 'git', 'vuejs', 'vue', 'angularjs', 'angular', 'nodejs', 'node', 'tailwind', 'j2ee', 'playwright', 'bootstrap', 'foundation',
     'materialize', 'rust', 'css3', 'obj'
    ]

const DATABASES = ['nosql', 'mysql', 'postgresql', 'postgres', 'mongodb', 'cassandra', 'spark', 'sparks','sql', 'sqlite', 'msql','databricks', 
    'databrick', 'azure', 'redis','apache','amazon','dynamodb', 'dynamo', 'couchbase', 'neo4j', 'graphql', 'aurora', 'rds', 'eks', 
    'mssql',  'oracle', 'cloud', 'gcp']

const METHODOLOGY = ['agile', 'scrum', 'sdlc', 'qa', 'seo',]

const OTHERS = ['rest' ,'restful', 'restfuls', 'api', 'apis', 'xml', 'json', 'aws', 'microservices', 'microservice', 'spring', 'boot', 
  'django', 'flask', 'ec2', 'ci', 'cd', 'cicd', 'vpc', 's3', 'jquery', 'ajax', 'etl', 'tomcat']

const TOOLS = ['postman', 'jira', 'selenium', 'docker', 'kubernetes', 'kubernete',  'lambda', 'devops', 'devop', 'terraform',
   'cloudformation', 'bash', 'linux', 'macos','unix', 'windows', 'macintosh', 'ansible', 'jest', 'mocha', 'informatica', 'tabkeau']


  app.get('/', (req, res) => {
    console.log("WORKS");
    // res.header("Access-Control-Allow-Origin", "*");
    res.send('Hello World! v1.6')
});

const connectionString = process.env.ATLAS_URI || "";
const client = new MongoClient(connectionString);

let conn;

async function connection() {
    try {
        conn = await client.connect();
        return conn;
      } catch(e) {
        console.error(e);
      }
}
connection();

function countRepeatedWords(sentence) {

    let words = sentence
        .toLowerCase()
        .replace(/[/]/g, ' ')
        .replace(/[^\w\s/]/g, '')
        .split(/\s/)
        .filter(word => relevantKeyword(word));
    
    let wordMap = {};
    // console.log(sentence.toLowerCase().replace(/[/]/g, ' ').replace(/[^\w\s]/g, ''));
    for (let i = 0; i < words.length; i++) {
        if (words[i] === ''){
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

    console.log(req.query);
    const {userInput, jobTitle, companyName, companyLocation, dateOfSubmission, companyURL} = req.query;
    const wordMap = countRepeatedWords(userInput);
    console.log("WordMap:", wordMap);
    let conn;
    try{
      if (!conn || conn ===  null){
        conn = await connection();
      }
      let collection = await conn.db("company").collection('information');
      let results = await collection.insertOne({companyName, jobTitle, companyLocation, dateOfSubmission, companyURL, wordMap, userInput})
    }  catch (error) {
      console.error("ERROR OCCURRED DURING PARSE", error);
    }
    res.send(wordMap);
});


// Retrieve all documents but only keeping the wordMap
app.post('/global-statistics', async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  let collection;
  let conn;
  try{
    if (!conn || conn === null){
      conn = await connection();
    }
    collection = await conn.db("company").collection('information');
  } catch (error) {
    console.error("Error 1", conn);
    console.error("Error 2", connectionString);
    console.error("Error 3", client);
    console.error("ERROR OCCURRED DURING POST 4",error);
    res.status(400).send("FAILED REQUEST");
  }
    const agg = [
        {
          '$project': {
            '_id': 0, 
            "companyName": 1,
            "jobTitle": 1,
            "companyLocation": 1,
            "dateOfSubmission": 1,
            "companyURL": 1,
            "wordMap": 1
          }
        }
      ];

    let data = await collection.aggregate(agg).toArray();
    let totalMap =  {}
    let totalCompany = []
    for (let i = 0; i < data.length; i++){
        let currentData = data[i]
        console.log(currentData.wordMap);
        console.log("CurrentData:", currentData);
        const relevantInformation = {
          companyName: currentData.companyName,
          jobTitle: currentData.jobTitle,
          companyLocation: currentData.companyLocation,
          dateOfSubmission: currentData.dateOfSubmission,
          companyURL: currentData.companyURL,
        }
        totalCompany.push(relevantInformation);
          for (const [key,value] of Object.entries(currentData.wordMap)){
              let currentWordCount = totalMap[key]
              let count = currentWordCount ? currentWordCount : 0;
              totalMap[key] = count + value

          }
    }

    const sortedDict = Object.fromEntries(
        Object.entries(totalMap).sort(([,a],[,b]) => b-a)
    );
    console.log('totalMap===', sortedDict);
    res.send({sortedDict, length: data.length, relevantInformation: totalCompany});
});

app.get('/global-statistics', async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.send("This is the global-statistics-page")
});

// Handling shutdown server
// Error Handling
process.on("SIGINT", async () => {
    try{
      await client.close();     // Close MongoDB connection
      console.log("MongoDB server closed successfully");
      process.exit(0);      // No Error Exit
    } catch (error){
      console.log("Error occurred during shutdown");
      process.exit(1);    // Fatal Error Exit
    }
  });
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
