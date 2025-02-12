const WellnessGoals = require('../models/wellnessGoals')
const HealthInfo = require('../models/healthInfo')

const providerController = {}

providerController.listPatientsHealthRecords = async (req, res) => {
    WellnessGoals.find({ })
        .then((healthData) => {
            res.status(200).json(healthData)
        })
        .catch((err) => {
            res.status(404).json(err)
        })
}

providerController.particularPatientRecord = async (req, res) => {
    WellnessGoals.findOne({userId: req?.params?.id })
        .then((healthData) => {
            res.status(200).json(healthData)
        })
        .catch((err) => {
            res.status(404).json(err)
        })
}

module.exports = providerController
