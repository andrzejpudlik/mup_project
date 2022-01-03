import mongoose from 'mongoose'

const TypeDevicesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  }
})

const TypeDevicesModel = mongoose.model('type_devices', TypeDevicesSchema)

export default TypeDevicesModel