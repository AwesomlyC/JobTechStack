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
     'html5', 'git', 'vuejs', 'vue', 'angularjs', 'angular'
    ]
const DATABASES = ['nosql', 'mysql', 'postgresql', 'mongodb', 'cassandra', 'spark', 'sparks','sql', 'sqlite', 'msql','databricks', 
    'databrick', 'azure', 'redis','apache','amazon','dynamodb', 'dynamo', 'couchbase', 'neo4j', 'graphql', 'aurora', 'rds', 'eks' ]
const METHODOLOGY = ['agile', 'scrum']
const OTHERS = ['rest' ,'restful', 'restfuls', 'api', 'apis', 'xml', 'json', 'aws', 'microservices', 'microservice', 'spring', 'boot']
const TOOLS = ['postman', 'jira', 'selenium', 'docker', 'kubernetes', 'kubernete',  'lambda' ]


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

app.get('/parse', async (req, res) => {
    console.log(req.query);
    const {userInput, jobTitle, companyName, companyLocation, dateOfSubmission, companyURL} = req.query;
    const wordMap = countRepeatedWords(userInput);
    console.log("WordMap:", wordMap);
    
    let collection = await conn.db("company").collection('information');
    
    let results = await collection.insertOne({companyName, jobTitle, companyLocation, dateOfSubmission, companyURL, wordMap, userInput})
    
    res.send(wordMap);
})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
