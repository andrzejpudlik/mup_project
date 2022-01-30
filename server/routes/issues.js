import express from 'express'
import Issue from '../models/Issue.js'
import verifyToken from '../middleware/verifyToken.js'

const router = express.Router()

router.get('/issues', verifyToken, async (req, res) => {
  try {
    const issues = await Issue.find()
    res.json(issues)
  } catch (err) {
    res.json({ status: 'error', error: 'Wystąpił błąd, spróbuj ponownie' })
  }
})

router.post('/issues', verifyToken, async (req, res) => {
  const { name, additionalInfo, priority, whoIntroduced, dateIntroduced } = req.body

  const now = new Date()
  let day = now.getDate().toString()
  let month = (now.getMonth() + 1).toString()
  const year = now.getFullYear().toString().substr(2,2)
  const random = Math.floor(Math.random()*100)

  if (month.length === 1) {
    month = '0'.concat(month)
  }
  if (day.length === 1) {
    day = '0'.concat(day)
  }

  const issueNumber = `${random}${day}/${month}${year}`

  try {
    const issue = new Issue({
      issueNumber,
      name,
      additionalInfo,
      priority,
      whoIntroduced,
      dateIntroduced,
    })

    await issue.save()

    res.json({ status: 'ok' })
  } catch (err) {
    res.json({ status: 'error', error: 'Wystąpił błąd, spróbuj ponownie' })
  }
})

router.post('/issue_active', verifyToken, async (req, res) => {
  try {
    const activeIssue = await Issue.findOne({ issueNumber: req.body.issueNumber })
    res.json(activeIssue)
  } catch (err) {
    res.json({ status: 'error', error: 'Wystąpił błąd, spróbuj ponownie' })
  }
})

router.patch('/issue_active_update_status', verifyToken, async (req, res) => {

  const { issueNumber, status, dateClosed, whoClosed } = req.body
  try {
    await Issue.findOneAndUpdate(
      { issueNumber },
      { status, dateClosed, whoClosed }
    )
    res.json({ status: 'ok' })
  } catch (err) {
    res.json({ status: 'error', error: 'Wystąpił błąd, spróbuj ponownie' })
  }
})

router.post('/issue_active_delete', verifyToken, async (req, res) => {
  try {
    const deleteIssue = await Issue.findOne({ issueNumber: req.body.issueNumber})
    await Issue.remove(deleteIssue)
    res.json({ status: 'delete' })
  } catch (err) {
    res.json({ status: 'error' })
  }
})

router.patch('/issue_active/update_info', verifyToken, async (req, res) => {

  const { issueNumber, name, additionalInfo } = req.body
  try {
    await Issue.findOneAndUpdate(
      { issueNumber },
      { name, additionalInfo }
    )
    res.json({ status: 'ok' })
  } catch (err) {
    res.json({ status: 'error', error: 'Wystąpił błąd, spróbuj ponownie' })
  }
})

export default router