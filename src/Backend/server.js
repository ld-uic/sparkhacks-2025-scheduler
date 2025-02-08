const express = require("express");
const cors = require("cors");
const timeslotRoutes = require("/routes/timeslots");
var fs = require("fs"),json;
const path = require('path');

//Path to the file
const dbPath = path.resolve(__dirname, 'users.json');

// Read data from the JSON file
function readDatabase() {
    const data = fs.readFileSync(dbPath, 'utf8');
    return JSON.parse(data);
}
  
// Write data to the JSON file
function writeDatabase(data) {
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), 'utf8');
}

const app = express();
const port = process.env.PORT || 5000;


//connectDB();

app.use(cors());
app.use(express.json());

app.use("/timeslots", timeslotRoutes);

app.get("/", (req, res) => {
    res.send(":rocket: API is working!");
});

app.listen(port, () => {
    console.log(`🚀 Server running on port ${port}`);
});