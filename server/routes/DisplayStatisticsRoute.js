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
    res.send({totalCount, curCount, yesterdayCount})
});


// Update all technical/keyword of user
router.post('/user/keyword/update', async (req, res) => {
    const {userID} = req.body;

    res.send("Updated...");
});

module.exports = router;

