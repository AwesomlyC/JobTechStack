// app.js
const express = require('express')
const app = express()
const port = process.env.PORT || 5000
const cors = require('cors');


app.use(cors());

app.use(cors({
    origin: 'http://localhost:3000' // Replace with your allowed origin
  }));

app.get('/', (req, res) => {
    console.log("WORKS");
    res.send('Hello World!')
});
function countRepeatedWords(sentence) {
    const stopWords = ['i','me','my','myself','we','our','ours','ourselves','you','your','yours','yourself','yourselves','he','him','his','himself','she','her','hers','herself','it','its','itself','they','them','their','theirs','themselves','what','which','who','whom','this','that','these','those','am','is','are','was','were','be','been','being','have','has','had','having','do','does','did','doing','a','an','the','and','but','if','or','because','as','until','while','of','at','by','for','with','about','against','between','into','through','during','before','after','above','below','to','from','up','down','in','out','on','off','over','under','again','further','then','once','here','there','when','where','why','how','all','any','both','each','few','more','most','other','some','such','no','nor','not','only','own','same','so','than','too','very','s','t','can','will','just','don','should','now'];    console.log('called parse request');

    let words = sentence
        .toLowerCase()
        .replace(/[^\w\s]/g, '')
        .split(/\s/)
        .filter(word => !stopWords.includes(word) && word.length > 2);
    let wordMap = {};

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

app.get('/parse', (req, res) => {
    console.log(req.query);
    const {userInput} = req.query;

    // console.log(words, words.length);
    // console.log(filteredWords, filteredWords.length);

    // console.log(countRepeatedWords(userInput));
    const wordMap = countRepeatedWords(userInput);
    res.send(wordMap);
})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
