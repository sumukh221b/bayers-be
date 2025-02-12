const User = require('../models/User')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const md5 = require('md5'); 

const userCtrl = {}

userCtrl.register = (req, res) => {
    const body = req.body
    const userDetails = new User(body)
    userDetails.save()
        .then((user) => {
            res.status(200).json({
                code: 200,
                user,
                message: 'Registered Successfully!'
            })
        })
        .catch((err) => {
            res.json(err)
        })
}

userCtrl.login = (req, res) => {
    const body = req.body
    User.findOne({ email: body.email })
        .then((user) => {
            if (!user) {
                res.status(401).json({
                    error: 'Email not found. Kindly register!'
                })
            }

            bcryptjs.compare(body.password, user.password)
                .then((match) => {
                    if (match) {
                        const tokenData = {
                            id : user._id,
                            username : user.username,
                            email : user.email,
                            role: user.role
                        }
                        const token = jwt.sign(tokenData, 'abc321', {expiresIn: '10h'})
                        res.status(200).json({
                            token : `Bearer ${token}`
                        })
                    } else {
                        res.status(401).json({
                            error: 'Invalid email or password'
                        })
                    }
                })
        })
}

// userCtrl.login = (req, res) => {
//     const body = req.body;

//     User.findOne({ email: body.email })
//         .then((user) => {
//             if (!user) {
//                 return res.status(401).json({
//                     error: 'Email not found. Kindly register!'
//                 });
//             }

//             const md5HashedPassword = md5(body.password);

//             if (md5HashedPassword === user.password) {
//                 const tokenData = {
//                     id: user._id,
//                     username: user.username,
//                     email: user.email,
//                     role: user.role
//                 };
//                 const token = jwt.sign(tokenData, 'abc321', { expiresIn: '10h' });

//                 res.status(200).json({
//                     token: `Bearer ${token}`
//                 });
//             } else {
//                 res.status(401).json({
//                     error: 'Invalid email or password'
//                 });
//             }
//         })
//         .catch((err) => {
//             res.json({
//                 error: 'Error finding user',
//                 details: err
//             });
//         });
// };

userCtrl.account = (req, res) => {
    res.json(req.user)
}

module.exports = userCtrl