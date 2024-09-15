const functions = require("firebase-functions/v2");
const express = require("express");
const fs = require("fs");
const path = require("path");
const multer = require("multer");
const cors = require('cors');

const app = express();
const jsonFilePath = path.join(__dirname, 'db.json');

app.use(cors());
app.use(express.json());

// Serve static files from 'files' and 'images' directories
app.use('/files', express.static(path.join(__dirname, 'files')));
app.use('/images', express.static(path.join(__dirname, 'images')));

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    // Check if the file is an image
    if ([".jpg", ".jpeg", ".png", ".gif", ".bmp", ".svg"].includes(ext)) {
      cb(null, path.join(__dirname, "images"));
    } else {
      cb(null, path.join(__dirname, "files"));
    }
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

// API endpoint to test the function
app.get('/test', (req, res) => {
  res.send('Hello World');
});

// API endpoint to handle file upload
app.post("/upload-file", upload.single("file"), (req, res) => {
  const file = req.file;
  const { name } = req.body;

  if (!file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  fs.readFile(jsonFilePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      return res.status(500).json({ message: "Error reading file" });
    }

    const jsonData = JSON.parse(data);

    if (!jsonData.folder[name]) {
      return res.status(400).json({ message: "Folder not found" });
    }

    const ext = path.extname(file.originalname).toLowerCase();
    const fileType = [".jpg", ".jpeg", ".png", ".gif", ".bmp", ".svg"].includes(ext) ? "image" : "file";

    if (fileType === "image") {
      jsonData.folder[name].images.push(file.originalname);
    } else {
      jsonData.folder[name].files.push(file.originalname);
    }

    fs.writeFile(jsonFilePath, JSON.stringify(jsonData, null, 2), "utf8", (err) => {
      if (err) {
        console.error("Error writing file:", err);
        return res.status(500).json({ message: "Error writing file" });
      }

      console.log("File successfully uploaded and db.json updated");
      res.status(200).json({ fileName: file.originalname, fileType });
    });
  });
});

// API endpoint to update data in db.json
app.post("/update-data", (req, res) => {
  const newData = req.body;

  fs.readFile(jsonFilePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      res.status(500).send("Error reading file");
      return;
    }

    const jsonData = JSON.parse(data);
    jsonData.folder = newData.folder;

    fs.writeFile(jsonFilePath, JSON.stringify(jsonData, null, 2), "utf8", (err) => {
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

// API endpoint to add a folder
app.post("/add-folder", (req, res) => {
  const { name } = req.body;

  if (!name || typeof name !== 'string') {
    return res.status(400).json({ message: "Invalid folder name" });
  }

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

    if (!jsonData.folder) {
      jsonData.folder = {};
    }

    if (!jsonData.folder[name]) {
      jsonData.folder[name] = { files: [], images: [] };
    } else {
      return res.status(400).json({ message: "Folder already exists" });
    }

    fs.writeFile(jsonFilePath, JSON.stringify(jsonData, null, 2), 'utf8', (writeErr) => {
      if (writeErr) {
        console.error("Error writing file:", writeErr);
        return res.status(500).json({ message: "Error writing file" });
      }

      console.log("Folder added successfully:", name);
      res.status(200).json({ message: "Folder added successfully", data: { name, files: [], images: [] } });
    });
  });
});

// API endpoint to get the content of db.json
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

// Ensure the app listens on the correct port

const port = process.env.PORT || 8080;
app.listen(8786, () => {
  console.log(`Server running on port 8786   `);
});

// Export the app as a Firebase Function
exports.app = functions.https.onRequest(app);









/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

// const {onRequest} = require("firebase-functions/v2/https");
// const logger = require("firebase-functions/logger");

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
