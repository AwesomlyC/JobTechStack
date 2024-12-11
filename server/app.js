// app.js
const express = require('express')
const app = express()
const port = process.env.PORT || 5000
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const dotenv = require('dotenv');
dotenv.config({path: './../.env'});

app.use(cors());

app.use(cors({
    origin: 'http://localhost:3000' // Replace with your allowed origin
  }));

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
     'html5', 'git', 'vuejs', 'vue', 'angularjs', 'angular', 'nodejs', 'node'
    ]
const DATABASES = ['nosql', 'mysql', 'postgresql', 'mongodb', 'cassandra', 'spark', 'sparks','sql', 'sqlite', 'msql','databricks', 
    'databrick', 'azure', 'redis','apache','amazon','dynamodb', 'dynamo', 'couchbase', 'neo4j', 'graphql', 'aurora', 'rds', 'eks', 
    'mssql',  'oracle', 'cloud']
const METHODOLOGY = ['agile', 'scrum']
const OTHERS = ['rest' ,'restful', 'restfuls', 'api', 'apis', 'xml', 'json', 'aws', 'microservices', 'microservice', 'spring', 'boot', 'django', 'flask']
const TOOLS = ['postman', 'jira', 'selenium', 'docker', 'kubernetes', 'kubernete',  'lambda', 'devops', 'devop' ]


  app.get('/', (req, res) => {
    console.log("WORKS");
    res.send('Hello World!')
});

const connectionString = process.env.ATLAS_URI || "";
const client = new MongoClient(connectionString);
let conn;

async function connection() {
    try {
        conn = await client.connect();
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
    console.log(req.query);
    const {userInput, jobTitle, companyName, companyLocation, dateOfSubmission, companyURL} = req.query;
    const wordMap = countRepeatedWords(userInput);
    console.log("WordMap:", wordMap);
    
    let collection = await conn.db("company").collection('information');
    
    let results = await collection.insertOne({companyName, jobTitle, companyLocation, dateOfSubmission, companyURL, wordMap, userInput})
    
    res.send(wordMap);
});


// Retrieve all documents but only keeping the wordMap
app.post('/global-statistics', async (req, res) => {
    let collection = await conn.db("company").collection('information');
    const agg = [
        {
          '$project': {
            '_id': 0, 
            'wordMap': 1
          }
        }
      ];

    let data = await collection.aggregate(agg).toArray();
    let totalMap =  {}

    for (let i = 0; i < data.length; i++){
        let currentData = data[i]
        console.log(currentData);
        for (const wordMap of Object.values(currentData)){
            for (const [key,value] of Object.entries(wordMap)){
                let currentWordCount = totalMap[key]
                let count = currentWordCount ? currentWordCount : 0;
                totalMap[key] = count + value

            }
        }
    }

    const sortedDict = Object.fromEntries(
        Object.entries(totalMap).sort(([,a],[,b]) => b-a)
    );
    console.log('totalMap===', sortedDict);
    res.send({sortedDict, length: data.length});
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
