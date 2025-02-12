const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
const Schema = mongoose.Schema

const healthInfo = new Schema({
   diseaseName: String,
   currentMedication: String,
   userId : {
    type : Schema.Types.ObjectId,
    ref : 'User'
    }
}, { timestamps: true })

const HealthInfo = mongoose.model('HealthInfo', healthInfo)
module.exports = HealthInfo