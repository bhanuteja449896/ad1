const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 5000;

app.use(express.json());

const dataFilePath = path.join(__dirname, 'db.json');

// Middleware to log every request
app.use((req, res, next) => {
  console.log(`${req.method} request made to ${req.url}`);
  next();
});

// Route to get data
app.get('/data', (req, res) => {
  fs.readFile(dataFilePath, (err, data) => {
    if (err) {
      console.error('Error reading data file:', err);
      return res.status(500).send('Server error');
    }
    res.json(JSON.parse(data));
  });
});

// Route to delete a file or image
app.delete('/delete/:name/:type/:index', (req, res) => {
  const { name, type, index } = req.params;
  fs.readFile(dataFilePath, (err, data) => {
    if (err) {
      console.error('Error reading data file:', err);
      return res.status(500).send('Server error');
    }
    let dataObj = JSON.parse(data);
    if (dataObj[name] && dataObj[name][type]) {
      dataObj[name][type].splice(index, 1);
      fs.writeFile(dataFilePath, JSON.stringify(dataObj, null, 2), (err) => {
        if (err) {
          console.error('Error writing data file:', err);
          return res.status(500).send('Server error');
        }
        console.log(`Deleted ${type} index ${index} for ${name}`);
        res.send('Data deleted');
      });
    } else {
      res.status(404).send('Data not found');
    }
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
