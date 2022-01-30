import mongoose from 'mongoose'

const DemandSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  cost: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: 'Aktywny'
  },
  whoIntroduced: {
    type: String,
    required: true,
  },
  dateIntroduced: {
    type: String,
    required: true,
  },
  dateClosed: {
    type: String,
  },
  whoClosed: {
    type: String,
  }
})

const DemandModel = mongoose.model('demands', DemandSchema)

export default DemandModel