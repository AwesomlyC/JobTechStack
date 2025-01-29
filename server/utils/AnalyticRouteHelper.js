const express = require('express');
const router = express.Router();
const { connection } = require('./../utils/connectionDB')

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


module.exports = { getRangeOfDates, getLocationData, getKeywordPieData, getJobsLineData, getDaysDifference };
