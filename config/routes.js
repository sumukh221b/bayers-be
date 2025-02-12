const express = require('express')
const router = express.Router()
const userCtrl = require('../app/controllers/userController')
const {authenticateUser} = require('../app/middlewares/authentication')
const patientHealthCtrl = require('../app/controllers/patientHealthController')
const providerController = require('../app/controllers/providerController')

// User
router.post('/users/register', userCtrl.register)
router.post('/users/login', userCtrl.login)
router.get('/users/account', authenticateUser, userCtrl.account)

// Patient's Health Info
router.get('/health-info', authenticateUser, patientHealthCtrl.list)
router.post('/health-info', authenticateUser, patientHealthCtrl.create)
router.put('/health-info', authenticateUser, patientHealthCtrl.update)
router.delete('/health-info', authenticateUser, patientHealthCtrl.hardDelete)

// Patient's Wellness Goals
router.get('/patient-info', authenticateUser, providerController.listPatientsHealthRecords)
router.get('/patient-info', authenticateUser, providerController.particularPatientRecord)


module.exports = router