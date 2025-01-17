const express = require('express');
const router = express.Router();
const { connection, retrieveAllStatistics } = require('./../utils/connectionDB')

router.post('/display-keyword-pie', async (req, res) => {
    const statistics = await retrieveAllStatistics();
    const mapOfRelevantKeywords = statistics.sortedDict;

    let labels = [], dataCounts = [];
    let others = 'others', freq = 0;
    for (const keyword of Object.keys(mapOfRelevantKeywords)) {
        if (mapOfRelevantKeywords[keyword] > 6) {
            labels.push(keyword)
            dataCounts.push(mapOfRelevantKeywords[keyword]);
        } else {
            freq = freq + mapOfRelevantKeywords[keyword];
        }
    }

    labels.push(others);
    dataCounts.push(freq);

    res.send({ labels, dataCounts });
});


router.post('/display-data-line', async (req, res) => {
    const statistics = await retrieveAllStatistics();
    let conn;
    try {
        conn = await connection();
    } catch (error) {
        console.error('error occurred during delete-post');
        console.error("connection:", conn);
        res.status(400).send("Connection with db failed");
    }

    try {
        const collection = await conn.db("company").collection("information");
        const { start, range, end } = await getRangeOfDates(collection);

        const labels = [], dataPoints = new Array(range + 1).fill(0);
        // Labels: [start, end] inclusive
        for (let i = 0; i < range + 1; i++) {
            const currentDate = new Date(start);
            const nextDate = new Date(currentDate.setDate(start.getDate() + i));
            const date = nextDate.toISOString().split('T')[0]
            labels.push(date);
        }


        for (const key in statistics.relevantInformation) {
            const docDate = statistics.relevantInformation[key].dateOfSubmission
            dataPoints[getDaysDifference(start, new Date(docDate))]++;
        }

        let total_count = 0;

        const avg_dataPoints = []
        for (let i = 0; i < dataPoints.length; i++) {
            total_count += dataPoints[i];
            avg_dataPoints.push(total_count / (avg_dataPoints.length + 1));
        }

        const startDateString = start.toISOString().split('T')[0]
        const endDateString = end.toISOString().split('T')[0]
        res.send({ labels, dataPoints, avg_dataPoints, startDateString, endDateString });
    }
    catch (error) {
        console.error("Error with display-data-line ---", error);
    }
});
async function getRangeOfDates(collection) {
    const query = {}
    const maximum = {
        sort: { "dateOfSubmission": -1 },
        projection: { _id: 0, 'dateOfSubmission': 1 }
    }
    const minimum = {
        sort: { "dateOfSubmission": 1 },
        projection: { _id: 0, 'dateOfSubmission': 1 }
    }
    const maximumDate = new Date((await collection.findOne(query, maximum)).dateOfSubmission);
    const minimumDate = new Date((await collection.findOne(query, minimum)).dateOfSubmission);

    return { start: minimumDate, range: getDaysDifference(minimumDate, maximumDate), end: maximumDate }
};
const HOURS_PER_DAY = 24;
const MINUTES_PER_HOUR = 60;
const SECONDS_PER_MINUTE = 60;
const MILISECONDS_PER_SECOND = 1000;

function getDaysDifference(date1, date2) {
    const diffInMilliseconds = date2.getTime() - date1.getTime();
    const millisecondsPerDay = MILISECONDS_PER_SECOND * SECONDS_PER_MINUTE *
        MINUTES_PER_HOUR * HOURS_PER_DAY

    return Math.round(diffInMilliseconds / millisecondsPerDay);
};

router.post('/display-location-pie', async (req, res) => {
    const statistics = await retrieveAllStatistics();
    const relevantInformation = statistics.relevantInformation;

    const locationMap = {};
    for (let i = 0; i < relevantInformation.length; i++) {
        const companyData = relevantInformation[i];
        const companyLocation = companyData.companyLocation;
        if (locationMap[companyLocation]) {
            locationMap[companyLocation]++;
        } else {
            locationMap[companyLocation] = 1;
        }
    }


    const labels = Object.keys(locationMap), dataCounts = Object.values(locationMap);
    res.send({ labels, dataCounts });

});

function getKeywordPieData(sortedDict) {

    let keywordLabel = [], keywordDataCounts = [];
    let others = 'others', freq = 0;
    for (const keyword of Object.keys(sortedDict)) {
        if (sortedDict[keyword] > 6) {
            keywordLabel.push(keyword)
            keywordDataCounts.push(sortedDict[keyword]);
        } else {
            freq = freq + sortedDict[keyword];
        }
    }

    keywordLabel.push(others);
    keywordDataCounts.push(freq);

    return { keywordLabel, keywordDataCounts };
}
async function getJobsLineData(relevantInformation) {
    let conn;
    try {
        conn = await connection();
    } catch (error) {
        console.error('error occurred during delete-post');
        console.error("connection:", conn);
        return
    }

    try {
        const collection = await conn.db("company").collection("information");
        const { start, range, end } = await getRangeOfDates(collection);

        const jobsLabel = [], jobsDataPoints = new Array(range + 1).fill(0);
        // Labels: [start, end] inclusive
        for (let i = 0; i < range + 1; i++) {
            const currentDate = new Date(start);
            const nextDate = new Date(currentDate.setDate(start.getDate() + i));
            const date = nextDate.toISOString().split('T')[0]
            jobsLabel.push(date);
        }


        for (const key in relevantInformation) {
            const docDate = relevantInformation[key].dateOfSubmission
            jobsDataPoints[getDaysDifference(start, new Date(docDate))]++;
        }

        let total_count = 0;

        const avgJobsAppliedDataPoints = []
        for (let i = 0; i < jobsDataPoints.length; i++) {
            total_count += jobsDataPoints[i];
            avgJobsAppliedDataPoints.push(total_count / (avgJobsAppliedDataPoints.length + 1));
        }

        const startDateString = start.toISOString().split('T')[0]
        const endDateString = end.toISOString().split('T')[0]
        return { jobsLabel, jobsDataPoints, avgJobsAppliedDataPoints, startDateString, endDateString };
    }
    catch (error) {
        console.error("Error with display-data-line ---", error);
    }
}
function getLocationData(relevantInformation) {
    const locationMap = {};
    for (let i = 0; i < relevantInformation.length; i++) {
        const companyData = relevantInformation[i];
        const companyLocation = companyData.companyLocation;
        if (locationMap[companyLocation]) {
            locationMap[companyLocation]++;
        } else {
            locationMap[companyLocation] = 1;
        }
    }


    const locationLabel = Object.keys(locationMap), locationDataCounts = Object.values(locationMap);
    return { locationLabel, locationDataCounts };

}

router.post("/display-all-data", async (req, res) => {
    const { sortedDict, length, relevantInformation } = await retrieveAllStatistics();
    console.log(req.body);
    // Data for keyword pie graph
    const { keywordLabel, keywordDataCounts } = getKeywordPieData(sortedDict);
    // Data for location pie graph
    const { locationLabel, locationDataCounts } = getLocationData(relevantInformation);
    // Data for jobs applied line graph
    const { jobsLabel, jobsDataPoints, avgJobsAppliedDataPoints, startDateString, endDateString } = await getJobsLineData(relevantInformation);


    res.send({
        keywordLabel, keywordDataCounts,
        jobsLabel, jobsDataPoints, avgJobsAppliedDataPoints, startDateString, endDateString,
        locationLabel, locationDataCounts
    });
});



module.exports = router;
