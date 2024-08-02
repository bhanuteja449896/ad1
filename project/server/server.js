const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const port = 3000;
const cors = require('cors');

const jsonFilePath = path.join(__dirname, 'db.json');



app.use(cors()); 

// Middleware to parse JSON bodies
app.use(express.json());

// Serve static files from 'public' directory (if needed)
app.use(express.static(path.join(__dirname, 'public')));
app.get('/test',(req,res)=>{
  res.send('Hello World')
})

// Handle update data request
app.post("/update-data", (req, res) => {
  console.log("Update Data Request Received");
  const newData = req.body;

  fs.readFile(path.join(__dirname, "db.json"), "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      res.status(500).send("Error reading file");
      return;
    }

    const jsonData = JSON.parse(data);
    jsonData.folder = newData.folder;

    fs.writeFile(path.join(__dirname, "db.json"), JSON.stringify(jsonData, null, 2), "utf8", (err) => {
      if (err) {
        console.error("Error writing file:", err);
        res.status(500).send("Error writing file");
        return;
      }

      console.log("Data successfully updated in db.json");
      res.status(200).send("Data updated successfully");
    });
  });
});


app.post("/add-folder", (req, res) => {
  try {
    const { name } = req.body; // Get the new folder name from the request

    if (!name || typeof name !== 'string') {
      return res.status(400).json({ message: "Invalid folder name" });
    }

    // Read the existing JSON data
    fs.readFile(jsonFilePath, 'utf8', (err, data) => {
      if (err) {
        console.error("Error reading file:", err);
        return res.status(500).json({ message: "Error reading file" });
      }

      let jsonData;
      try {
        jsonData = JSON.parse(data);
      } catch (parseError) {
        console.error("Error parsing JSON:", parseError);
        return res.status(500).json({ message: "Error parsing JSON" });
      }

      // Add the new folder with empty files and images arrays
      if (!jsonData.folder) {
        jsonData.folder = {};
      }
      
      if (!jsonData.folder[name]) {
        jsonData.folder[name] = { files: [], images: [] };
      } else {
        return res.status(400).json({ message: "Folder already exists" });
      }

      // Write the updated JSON data back to the file
      fs.writeFile(jsonFilePath, JSON.stringify(jsonData, null, 2), 'utf8', (writeErr) => {
        if (writeErr) {
          console.error("Error writing file:", writeErr);
          return res.status(500).json({ message: "Error writing file" });
        }

        console.log("Folder added successfully:", name);
        res.status(200).json({ message: "Folder added successfully", data: { name, files: [], images: [] } });
      });
    });
  } catch (error) {
    console.error("Error processing request:", error);
    res.status(400).json({ message: "Error processing request" });
  }
});


app.get('/get-db', (req, res) => {
  fs.readFile(jsonFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      return res.status(500).json({ message: "Error reading file" });
    }

    try {
      const jsonData = JSON.parse(data);
      res.status(200).json(jsonData);
    } catch (parseError) {
      console.error("Error parsing JSON:", parseError);
      res.status(500).json({ message: "Error parsing JSON" });
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});


