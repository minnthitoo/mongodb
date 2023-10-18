const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const register = (request, response, next) => {
    bcrypt.hash(request.body.password, 10, (error, hash)=> {
        if(error){
            response.json({
                message: 'An error occured'
            });
        }else{
            let user = new User({
                name: request.body.name,
                email: request.body.email,
                password: hash,
                role_id: 4
            });
            if(request.file){
                user.avatar = request.file.filename;
            }
            user.save()
            .then((result) => {
                response.json({
                    message: 'Registered Successfully'
                });
            }).catch((err) => {
                response.json({
                    message: 'An error occured'
                });
            });
        }
    })
}

const login = (request, response, next) => {
    let email = request.body.email;
    let password = request.body.password;
    let payload = {email};
    User.findOne(payload)
    .then((user) => {
        if(user){

            bcrypt.compare(password, user.password, (error, result) => {

                if(error){
                    response.json({
                        message: 'An error occured'
                    });
                }else if(result){

                    let token = jwt.sign(payload, process.env.SECRET);
                    response.json({
                        token
                    });

                }else{
                    response.json({
                        message: 'Password doesn\'t match'
                    });
                }

            });

        }else{
            response.json({
                message: 'There is no user'
            });
        }
    }).catch((err) => {
        response.json({
            message: 'An error occured'
        });
    });
}

module.exports = {
    register,
    login
}