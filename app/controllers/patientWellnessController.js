const WellnessGoals = require('../models/wellnessGoals')

const patientWellnessCtrl = {}

patientWellnessCtrl.create = (req, res) => {
    const body = req.body
    const patientDetails = new WellnessGoals(body)
    patientDetails.userId = req.user._id
    patientDetails.save()
        .then((healthData) => {
            res.status(200).json(healthData)
        })
        .catch((err) => {
            res.status(404).json(err)
        })
}

patientWellnessCtrl.list = (req, res) => {
    WellnessGoals.find({ userId: req.user._id })
        .then((healthData) => {
            res.status(200).json(healthData)
        })
        .catch((err) => {
            res.status(404).json(err)
        })
}

patientWellnessCtrl.show = (req, res) => {
    const id = req.params.id
    WellnessGoals.find({ _id: id, userId: req.user._id })
        .then((healthData) => {
            res.status(200).json(healthData)
        })
        .catch((err) => {
            res.status(404).json(err)
        })
}

patientWellnessCtrl.update = (req, res) => {
    const id = req.params.id
    const body = req.body
    WellnessGoals.findOneAndUpdate({ _id: id, userId: req.user._id }, body, { new: true })
        .then((healthData) => {
            res.status(200).json(healthData)
        })
        .catch((err) => {
            res.status(404).json(err)
        })
}

patientWellnessCtrl.hardDelete = (req, res) => {
    const id = req.params.id
    WellnessGoals.findOneAndDelete({ _id: id, userId: req.user._id })
        .then((healthData) => {
            res.status(200).json(healthData)
        })
        .catch((err) => {
            res.status(404).json(err)
        })
}

module.exports = patientWellnessCtrl