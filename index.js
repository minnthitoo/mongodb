require('dotenv').config();
const express       = require('express');
const mongoose      = require('mongoose');
const bodyParser    = require('body-parser');
const app           = express();

// routes
const AuthRoute     = require('./routes/auth');
const AdminRoute    = require('./routes/admin');
const path          = require('path');

mongoose.connect('mongodb://localhost:27017/auth_test', {family: 4});

const db = mongoose.connection;

db.on('error', () => {
    console.log('DB connection error occured');
});

db.on('open', () => {
    console.log('DB connected successfully');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, '')));

// use route
app.use('/api', AuthRoute);
app.use('/api/admin', AdminRoute);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on PORT ${process.env.PORT}`);
});