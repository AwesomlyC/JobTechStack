const express = require('express');
const router = express.Router();

const { retrieveAllStatistics } = require('./../utils/connectionDB')
// Retrieve all documents but only keeping the wordMap
router.post('/global-statistics', async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    const { userID } = req.body;
    console.log(userID);
    res.send(await retrieveAllStatistics(userID));
});
router.get('/global-statistics', async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.send("This is the global-statistics-page")
});
module.exports = router;

