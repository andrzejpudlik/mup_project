import express from 'express'
import Devices from '../models/Devices.js'
import verifyToken from '../middleware/verifyToken.js'

const router = express.Router()

router.get('/devices', verifyToken, async (req, res) => {
  try {
    const allDevices = await Devices.find()
    res.json(allDevices)
  } catch (err) {
    res.json({ status: 'error', error: 'Wystąpił błąd, spróbuj ponownie' })
  }
})

router.post('/devices', verifyToken, async (req, res) => {

  const { type, label, model, windows, disk, processor, diagonal, whoIntroduced, dateIntroduced } = req.body
  try {
    const device = new Devices({
      type,
      label,
      model,
      windows,
      disk,
      processor,
      diagonal,
      whoIntroduced,
      dateIntroduced,
    })

    await device.save()

    res.json({ status: 'ok' })
  } catch (err) {
    res.json({ status: 'error', error: 'Wystąpił błąd, spróbuj ponownie' })
  }
})

router.post('/device_active', verifyToken, async (req, res) => {
  try {
    const activeDevice = await Devices.findOne({ label: req.body.label})
    res.json(activeDevice)
  } catch (err) {
    res.json({ status: 'error', error: 'Wystąpił błąd, spróbuj ponownie' })
  }
})

router.put('/device_active', verifyToken, async (req, res) => {
  try {
    const updateDevice = await Devices.findById(req.body._id)
    res.json(updateDevice)
  } catch (err) {
    res.json({ status: 'error', error: 'Wystąpił błąd, spróbuj ponownie' })
  }
})

router.post('/device_active_delete', verifyToken, async (req, res) => {
  try {
    const deleteDevice = await Devices.findOne({ label: req.body.label})
    await Devices.remove(deleteDevice)
    res.json({ status: 'delete' })
  } catch (err) {
    res.json({ status: 'error' })
  }
})

export default router