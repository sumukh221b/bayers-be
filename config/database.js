require('dotenv').config(); // Load .env file

const mongoose = require('mongoose');

const configDb = () => {
    mongoose.connect(process.env.MONGO_URI)
        .then(() => {
            console.log('connected to DB');
        })
        .catch((error) => {
            console.error('not connected to DB', error);
        });
}

module.exports = configDb;