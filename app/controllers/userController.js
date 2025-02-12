const User = require('../models/User')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userCtrl = {}

userCtrl.register = (req, res) => {
    const body = req.body
    const userDetails = new User(body)
    userDetails.save()
        .then((user) => {
            res.status(200).json(user)
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
                res.json({
                    error: 'Invalid email or password'
                })
            }

            bcryptjs.compare(body.password, user.password)
                .then((match) => {
                    if (match) {
                        const tokenData = {
                            id : user._id,
                            username : user.username,
                            email : user.email
                        }
                        const token = jwt.sign(tokenData, 'abc321', {expiresIn: '10h'})
                        res.json({
                            token : `Bearer ${token}`
                        })
                    } else {
                        res.json({
                            error: 'Invalid email or password'
                        })
                    }
                })
        })
}

userCtrl.account = (req, res) => {
    res.json(req.user)
}

module.exports = userCtrl