import mongoose from 'mongoose'

const DeviceSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
    unique: true,
  },
  model: {
    type: String,
    required: true,
  },
  windows: {
    type: String,
  },
  disk: {
    type: String,
  },
  processor: {
    type: String,
  },
  diagonal: {
    type: String,
  },
  whoIntroduced: {
    type: String,
    required: true,
  },
  dateIntroduced: {
    type: String,
    required: true,
  },
})

const DevicesModel = mongoose.model('devices', DeviceSchema)

export default DevicesModel