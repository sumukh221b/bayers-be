const HealthInfo = require('../models/healthInfo')

const patientHealthCtrl = {}

patientHealthCtrl.create = (req, res) => {
    const body = req.body
    const patientDetails = new HealthInfo(body)
    patientDetails.userId = req.user._id
    patientDetails.save()
        .then((healthData) => {
            res.status(200).json(healthData)
        })
        .catch((err) => {
            res.status(404).json(err)
        })
}

patientHealthCtrl.list = (req, res) => {
    HealthInfo.find({ userId: req.user._id })
        .then((healthData) => {
            res.status(200).json(healthData)
        })
        .catch((err) => {
            res.status(404).json(err)
        })
}

patientHealthCtrl.show = (req, res) => {
    const id = req.params.id
    HealthInfo.find({ _id: id, userId: req.user._id })
        .then((healthData) => {
            res.status(200).json(healthData)
        })
        .catch((err) => {
            res.status(404).json(err)
        })
}

patientHealthCtrl.update = (req, res) => {
    const id = req.params.id
    const body = req.body
    HealthInfo.findOneAndUpdate({ _id: id, userId: req.user._id }, body, { new: true })
        .then((healthData) => {
            res.status(200).json(healthData)
        })
        .catch((err) => {
            res.status(404).json(err)
        })
}

patientHealthCtrl.hardDelete = (req, res) => {
    const id = req.params.id
    HealthInfo.findOneAndDelete({ _id: id, userId: req.user._id })
        .then((healthData) => {
            res.status(200).json(healthData)
        })
        .catch((err) => {
            res.status(404).json(err)
        })
}

module.exports = patientHealthCtrl