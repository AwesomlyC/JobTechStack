const express = require('express');
const router = express.Router();
const { retrieveAllStatistics } = require('./../utils/connectionDB')
const {getLocationData, getKeywordPieData, getJobsLineData} = require('./../utils/AnalyticRouteHelper');

// Route to display a specific user's line graph of the amount of job applications
// the user sent since the start of application to the end.
router.post('/display-line-graph-data', async (req, res) => {
    const {userID} = req.body;
    const {relevantInformation} = await retrieveAllStatistics(userID);
    const { jobsLabel, jobsDataPoints, avgJobsAppliedDataPoints, startDateString, endDateString } = await getJobsLineData(relevantInformation);
    res.send({
        jobsLabel, jobsDataPoints, avgJobsAppliedDataPoints, startDateString, endDateString
    });

});

// Route to display two pieces of information
// 1. Distribution of keywords, any technical keyword less than or equal to 6, will
//      be considered as 'other'.
// 2. Distribution of Locations applied to
//      Currently, there are only 3 locations: Remote, California, United States
router.post('/display-pie-chart-data', async (req, res) => {
    const {userID} = req.body;
    const {sortedDict, relevantInformation} = await retrieveAllStatistics(userID);
    // Data for keyword pie graph
    const { keywordLabel, keywordDataCounts } = getKeywordPieData(sortedDict);
    // Data for location pie graph
    const { locationLabel, locationDataCounts } = getLocationData(relevantInformation);

    res.send({
        keywordLabel, keywordDataCounts,
        locationLabel, locationDataCounts
    });
});


module.exports = router;
