const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const dbFilePath = path.join(__dirname, '..', 'public', 'db.json');  // Updated path
const credentialsFilePath = path.join(__dirname, '..', 'public', 'credentials.json');  // Updated path

// Middleware to parse JSON requests
app.use(bodyParser.json());

// Endpoint to handle 'Add' button click
app.post('/add', (req, res) => {
    const newData = req.body;
    console.log('Received data:', newData);

    // Read existing data from db.json
    fs.readFile(dbFilePath, (err, data) => {
        if (err && err.code !== 'ENOENT') {
            console.error('Error reading db.json:', err);
            return res.status(500).json({ error: 'Failed to read database file' });
        }

        let existingData = {};
        if (!err) {
            try {
                existingData = JSON.parse(data);
            } catch (parseErr) {
                console.error('Error parsing db.json:', parseErr);
                return res.status(500).json({ error: 'Failed to parse database file' });
            }
        }

        // Add new data to existing data
        existingData[newData.name] = { files: [], images: [] };

        // Write updated data back to db.json
        fs.writeFile(dbFilePath, JSON.stringify(existingData, null, 2), (writeErr) => {
            if (writeErr) {
                console.error('Error writing to db.json:', writeErr);
                return res.status(500).json({ error: 'Failed to write to database file' });
            }

            res.status(200).json({ message: 'Data added successfully' });
        });
    });
});

// Endpoint to handle 'update-data' POST requests
app.post('/update-data', (req, res) => {
    const updatedData = req.body;

    // Write updated data back to db.json
    fs.writeFile(dbFilePath, JSON.stringify(updatedData, null, 2), (writeErr) => {
        if (writeErr) {
            console.error('Error writing to db.json:', writeErr);
            return res.status(500).json({ error: 'Failed to write to database file' });
        }

        res.status(200).json({ message: 'Data updated successfully' });
    });
});

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, '..', 'public')));

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
