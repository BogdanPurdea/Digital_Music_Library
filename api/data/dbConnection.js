const mongoose = require('mongoose');
const configValues = require('./dbConfig.json');

var getDbConnectionString = function() {
    return 'mongodb+srv://' + configValues.username + ':' + 
            configValues.password + configValues.database;
}

module.exports = {
    connectToDatabase: function() {
        mongoose.connect(getDbConnectionString())
        .then(() => console.log('Connected to the database!'))
        .catch(err => console.error('Failed to connect to the database!', err));
    }
}