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

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
