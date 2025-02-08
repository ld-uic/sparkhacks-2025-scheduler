const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "..", "..", "build")))

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "..", "build", "index.html"));
})

app.listen(port, () => {
    console.log(`🚀 Server running on port ${port}`);
});

const usersFilePath = path.join(__dirname, "../data/users.json"); // Adjust path based on project structure

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
