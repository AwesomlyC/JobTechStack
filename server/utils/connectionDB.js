const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const dotenv = require('dotenv');


if (!process.env.DEVELOPMENT) {
    dotenv.config({ path: './../.env' });
}
const connectionString = process.env.ATLAS_URI || "";
const client = new MongoClient(connectionString);

async function connection() {
    try {
        let conn = await client.connect();
        return conn;
    } catch (e) {
        console.error(e);
    }
}

async function retrieveAllStatistics() {
    console.log("CALLED");
    let collection;
    let conn;
    try {
        if (!conn || conn === null) {
            conn = await connection();
        }
        collection = await conn.db("company").collection('information');
    } catch (error) {
        console.error("Error 1", conn);
        console.error("Error 2", connectionString);
        console.error("Error 3", client);
        console.error("ERROR OCCURRED DURING POST 4", error);
    }
    const agg = [
        {
            '$project': {
                '_id': 1,
                "companyName": 1,
                "jobTitle": 1,
                "companyLocation": 1,
                "dateOfSubmission": 1,
                "companyURL": 1,
                "wordMap": 1,
                "userInput": 1,
                "notes": 1,
            }
        }
    ];

    let data = await collection.aggregate(agg).toArray();
    let totalMap = {}
    let totalCompany = []
    for (let i = 0; i < data.length; i++) {
        let currentData = data[i]
        const relevantInformation = {
            companyName: currentData.companyName,
            jobTitle: currentData.jobTitle,
            companyLocation: currentData.companyLocation,
            dateOfSubmission: currentData.dateOfSubmission,
            companyURL: currentData.companyURL,
            userInput: currentData.userInput,
            documentID: currentData._id,
            notes: currentData.notes,
        }
        totalCompany.push(relevantInformation);
        for (const [key, value] of Object.entries(currentData.wordMap)) {
            let currentWordCount = totalMap[key]
            let count = currentWordCount ? currentWordCount : 0;
            totalMap[key] = count + value

        }
    }
    const sortedDict = Object.fromEntries(
        Object.entries(totalMap).sort(([, a], [, b]) => b - a)
    );
    return { sortedDict, length: data.length, relevantInformation: totalCompany };
}
// Handling shutdown server
// Error Handling
process.on("SIGINT", async () => {
    try {
        await client.close();     // Close MongoDB connection
        console.log("MongoDB server closed successfully");
        process.exit(0);      // No Error Exit
    } catch (error) {
        console.log("Error occurred during shutdown");
        process.exit(1);    // Fatal Error Exit
    }
});
module.exports = { connection, retrieveAllStatistics };