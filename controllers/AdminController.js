const User = require('../models/User');

const users = (request, response) => {
    User.find()
    .then((users) => {
        response.json({
            users
        })
    }).catch((err) => {
        response.json({
            message: 'An error occured'
        })
    });
}

module.exports = {
    users
}