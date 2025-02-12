const mongoose = require('mongoose');

const configDb = () => {
    mongoose.connect('mongodb+srv://Sumukh:<db_password>@cluster0.3k0i5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
            .then(() => {
                console.log('connected to DB');
            })
            .catch(() => {
                console.log('not connected to DB');
            })
}

module.exports = configDb