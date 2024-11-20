const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

// Middleware to parse JSON data
app.use(express.json());

// Serve static files (HTML form)
app.use(express.static(__dirname));

// Handle form submission and save data to JSON file
app.post('/submit', (req, res) => {
    const formData = req.body;

    // Define the path to the JSON file
    const jsonFilePath = path.join(__dirname, 'form-data.json');

    // Check if file exists, if not, create an empty array
    let jsonData = [];
    if (fs.existsSync(jsonFilePath)) {
        const data = fs.readFileSync(jsonFilePath);
        jsonData = JSON.parse(data);
    }

    // Add new form data to the array
    jsonData.push(formData);

    // Write updated data back to the file
    fs.writeFileSync(jsonFilePath, JSON.stringify(jsonData, null, 2));

    // Respond with a success message
    res.json({ message: 'Data saved successfully' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
