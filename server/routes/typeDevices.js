import express from 'express'
import TypeDevices from '../models/TypeDevices.js'
import verifyToken from '../middleware/verifyToken.js'

const router = express.Router()

router.get('/type_devices', verifyToken, async (req, res) => {
  try {
    const typeDevices = await TypeDevices.find()
    res.json(typeDevices)
  } catch (err) {
    res.json({ status: 'error', error: 'Wystąpił błąd, spróbuj ponownie' })
  }
})

router.post('/type_devices', verifyToken, async (req, res) => {
  try {
    const { name } = req.body

    const newTypeDevice = new TypeDevices({
      name
    })

    const savedTypeDevice = await newTypeDevice.save()
    res.json(savedTypeDevice)
  } catch (err) {
    res.json({ status: 'error', error: 'Wystąpił błąd, spróbuj ponownie' })
  }
})

export default router