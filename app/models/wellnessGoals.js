const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
const Schema = mongoose.Schema

const wellnessGoals = new Schema({
   targetSteps: Number,
   actualSteps: Number,
   targetSleep: String,
   actualSleep: String,
   targetWaterConsumption: Number,
   actualWaterConsumption: Number,
   userId : {
    type : Schema.Types.ObjectId,
    ref : 'User'
    }
}, { timestamps: true })

const WellnessGoals = mongoose.model('WellnessGoals', wellnessGoals)
module.exports = WellnessGoals