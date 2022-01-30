import mongoose from 'mongoose'

const IssueSchema = new mongoose.Schema({
  issueNumber: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  additionalInfo: {
    type: String,
  },
  priority: {
    type: Boolean,
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

const IssueModel = mongoose.model('issues', IssueSchema)

export default IssueModel