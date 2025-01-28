const express = require('express');
const router = express.Router();
const { connection, getCompanyInformationConnection } = require('./../utils/connectionDB')
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
        let results = await collection.insertOne(
            { companyName, jobTitle, companyLocation, dateOfSubmission, companyURL, wordMap, userInput, userID }
        );
        console.log(results)
    } catch (error) {
        console.error("ERROR OCCURRED DURING PARSE", error);
    }
    res.send(wordMap);
});

// Update all keywords related to a userID
// Fix any missing parse input due to it being updated.
router.post("/user/keyword/update", async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    const {userID} = req.body;
    console.log(userID);
    try {
        // Retrieve the collection
        let collection = await getCompanyInformationConnection();
        // Find documents belonging to the userID
        let query = {"userID": userID};
        let option = {}
        let userSet = await collection.find(query, option);

        // Iterate through user's documents
        for await (const doc of userSet){
            let newWordMap = countRepeatedWords(doc.userInput);
            let updateFilter = {
                _id: doc._id, 
                companyName: doc.companyName,
                jobTitle: doc.jobTitle,
                dateOfSubmission: doc.dateOfSubmission,
                companyURL: doc.companyURL,
                userID: userID,
            }
            
            let updateOption = {
                upsert: false,
            }
            let updateDoc = {
                $set: {
                    wordMap: newWordMap
                }
            }
            let result = await collection.updateOne(updateFilter, updateDoc, updateOption);
            console.log(result);
        }
    } catch (error) {
        res.send("FAILED");
    }
    res.send("OK");
});

module.exports = router;
