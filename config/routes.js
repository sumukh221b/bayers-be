const express = require('express')
const router = express.Router()
const userCtrl = require('../app/controllers/userController')
const {authenticateUser} = require('../app/middlewares/authentication')

// User
router.post('/users/register', userCtrl.register)
router.post('/users/login', userCtrl.login)
router.get('/users/account', authenticateUser, userCtrl.account)


module.exports = router