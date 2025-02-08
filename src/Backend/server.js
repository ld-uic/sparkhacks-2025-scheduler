const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "..", "build")))

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "..", "build", "index.html"));
});

//app.get("/login", (req, res) => {
//    res.sendFile(path.join(__dirname, "..", "..", "build", "login.html"));
//});

app.listen(port, () => {
    console.log(`🚀 Server running on port ${port}`);
    if (loadUsers() == []){
        console.log("Failed to load the database or database is empty!");
    }else{
        console.log("Database connected!");
    }
});

const usersFilePath = path.join(__dirname, "users.json"); // Adjust path based on project structure

// Load existing users from JSON file
function loadUsers() {
    try {
        const data = fs.readFileSync(usersFilePath, "utf8");
        return JSON.parse(data); // Parse JSON data into an object
    } catch (error) {
        return []; // Return an empty array if file doesn't exist or is empty
    }
}

// Save users to JSON file
function saveUsers(users) {
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2), "utf8");
}

// Writes times to user; id is index in json and time array is the whole list of time objects from front end
function modifyUserHours( data, user_id, time_array){
    data[user_id].workhours = time_array;
}

// POST route to add a new user
app.post("/", (req, res) => {
    try {
        let users = loadUsers(); // Load existing users
        const newUser = req.body;

        // Check if user with same ID already exists
        if (users.some(user => user.id === newUser.id)) {
            return res.status(400).json({ error: "User with this ID already exists." });
        }

        users.push(newUser); // Add new user to array
        saveUsers(users); // Save updated array to file

        res.status(201).json(newUser); // Respond with the created user
    } catch (err) {
        console.error("Error creating user:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// The expectation is to get {id: , startTime: , endTime: } in req.body and user id in req.head
app.post("/new", (req, res) => {
    try {
        const data = loadUsers();
        const time_list = req.body
        // Get user id
        const user_email = "placeholder@hotmail.org" //TODO: change to actual stuff
        // finding user
        var user_index = -1 
        for (let i = 0; i < data.length; i++) {
            if(data[i].id === user_email){
                user_index = i;
            }
        }
        // checking if we got the user
        if(user_index === -1){
            // TODO: Log user not found
            return;
        }
        // Add new time object
        data[user_index].workhours = [...data[user_index].workhours, ...time_list]
        // Submiting changes
        saveUsers(data);
        res.status(201).json(time_list); // Respond with the created user

    } catch (err){
        console.error("Error creating user:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// POST to submit times for users
app.post("/submit",(req, res) => {
    try {
        const data = loadUsers();
        const time_list = req.body
        // Get user id
        const user_email = "placeholder@hotmail.org" //TODO: change to actual stuff
        // finding user\
        var user_index = -1 
        for (let i = 0; i < data.length; i++) {
            if(data[i].id == user_email){
                user_index = i;
            }
        }
        // checking if we got the user
        if(user_index == -1){
            // TODO: Log user not found
            return;
        }
        // Going thru the BS i got into the function and replacing it un the db
        for (let i = 0; i < time_list.length; i++) {
            for (let j = 0; j < data[user_index].workhours.length; j++) {
                if(data[user_index].workhours[j].id == time_list[i].id){
                    data[user_index].workhours[j].startTime = time_list[i].startTime;
                    data[user_index].workhours[j].endTime = time_list[i].endTime;
                }
            }
        }
        // Submiting changes
        saveUsers(data);
        res.status(201).json(newUser); // Respond with the created user

    } catch (err){
        console.error("Error creating user:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

//DELETE for removing times
app.delete("/delete", (req, res) => {
    try {
        const data = loadUsers();
        const { userEmail, timeId } = req.body; // Expecting user email and time ID in the request body

        if (!userEmail || !timeId) {
            return res.status(400).json({ error: "Missing userEmail or timeId" });
        }

        let userIndex = data.findIndex(user => user.id === userEmail);

        if (userIndex === -1) {
            return res.status(404).json({ error: "User not found" });
        }

        // Remove the time entry with matching ID
        data[userIndex].workhours = data[userIndex].workhours.filter(time => time.id !== timeId);

        saveUsers(data);
        res.status(200).json({ message: "Work hour entry deleted successfully" });

    } catch (err) {
        console.error("Error deleting work hour entry:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.get("/retreve", (req, res) => {
    try {
        const data = loadUsers();
        return res.send(data[0].workhours);
    } catch (err){
        console.error("Error creating user:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});