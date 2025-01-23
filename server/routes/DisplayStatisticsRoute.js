const express = require('express');
const router = express.Router();

const { retrieveAllStatistics, getTotalCount, getDateCount } = require('./../utils/connectionDB')
// Retrieve all documents but only keeping the wordMap
router.post('/global-statistics', async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    const { userID } = req.body;
    res.send(await retrieveAllStatistics(userID));
});
router.get('/global-statistics', async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.send("This is the global-statistics-page")
});

// Want to return two values:
// Total number of documents submitted, AND
// Today's number of job submissions.

router.post('/user', async (req, res) => {
    const {userID, curDate, prevDate} = req.body;
    const totalCount = await getTotalCount(userID);
    const {curCount, yesterdayCount} = await getDateCount(userID, curDate, prevDate);
    console.log("RETURNING:" ,totalCount, curCount, yesterdayCount)
    res.send({totalCount, curCount, yesterdayCount})
    // res.send(totalCount)
});

module.exports = router;

