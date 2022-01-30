import express from 'express'
import Demand from '../models/Demand.js'
import verifyToken from '../middleware/verifyToken.js'

const router = express.Router()

router.get('/demands', verifyToken, async (req, res) => {
  try {
    const demands = await Demand.find()
    res.json(demands)
  } catch (err) {
    res.json({ status: 'error', error: 'Wystąpił błąd, spróbuj ponownie' })
  }
})

router.post('/demands', verifyToken, async (req, res) => {
  const { name, quantity, cost, whoIntroduced, dateIntroduced } = req.body

  try {
    const demand = new Demand({
      name,
      quantity,
      cost,
      whoIntroduced,
      dateIntroduced,
    })

    await demand.save()

    res.json({ status: 'ok' })
  } catch (err) {
    res.json({ status: 'error', error: 'Wystąpił błąd, spróbuj ponownie' })
  }
})

router.post('/demand_active', verifyToken, async (req, res) => {
  try {
    const activeDemand = await Demand.findOne({ whoIntroduced: req.body.who, dateIntroduced: req.body.date })
    res.json(activeDemand)
  } catch (err) {
    res.json({ status: 'error', error: 'Wystąpił błąd, spróbuj ponownie' })
  }
})

router.patch('/demand_active_update_status', verifyToken, async (req, res) => {

  const { demandActive, status, dateClosed, whoClosed } = req.body
  try {
    await Demand.findOneAndUpdate(
      { whoIntroduced: demandActive.who, dateIntroduced: demandActive.date },
      { status, dateClosed, whoClosed }
    )
    res.json({ status: 'ok' })
  } catch (err) {
    res.json({ status: 'error', error: 'Wystąpił błąd, spróbuj ponownie' })
  }
})

router.patch('/demand_active/update_info', verifyToken, async (req, res) => {
  
  const { demandActive, name, quantity, cost } = req.body
  try {
    await Demand.findOneAndUpdate(
      { whoIntroduced: demandActive.who, dateIntroduced: demandActive.date },
      { name, quantity, cost }
    )
    res.json({ status: 'ok' })
  } catch (err) {
    res.json({ status: 'error', error: 'Wystąpił błąd, spróbuj ponownie' })
  }
})

export default router