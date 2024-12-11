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
    const stopWords = ["is", "a", "for", "the", "of", "and", "to", "in", "on", "with", "at", "by"];

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
    const stopWords = ["is", "a", "for", "the", "of", "and", "to", "in", "on", "with", "at", "by"];
    console.log('called parse request');
    console.log(req.query);
    const {userInput} = req.query;

    const words = userInput.toLowerCase().split(/\s/);
    const filteredWords = words.filter(word => !stopWords.includes(word) && word.length > 2);
    // const words = userInput.split(' ');

    console.log(words, words.length);
    console.log(filteredWords, filteredWords.length);

    console.log(countRepeatedWords(userInput));
    const wordMap = countRepeatedWords(userInput);
    res.send(wordMap);
})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
