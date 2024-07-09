const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const dbConnection = require('./dbConnection');

const Artist = require('../models/artistModel');


dbConnection.connectToDatabase();
// Read the JSON file
const filePath = path.join(__dirname, './data.json');
const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
console.log(data);
// Insert data into MongoDB
Artist.create(data)
    .then(() => {
        console.log('Data imported successfully');
        mongoose.connection.close();
    })
    .catch(err => {
        console.error('Error importing data:', err);
        mongoose.connection.close();
    });