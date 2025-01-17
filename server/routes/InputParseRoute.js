const express = require('express');
const router = express.Router();
const { connection } = require('./../utils/connectionDB')
const { countRepeatedWords } = require('./../utils/ExtractTechnicalWord');

// Parse the user's input and store in the database
router.get('/parse', async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");

    const { userInput, jobTitle, companyName, companyLocation, dateOfSubmission, companyURL, userID } = req.query;
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


module.exports = router;
