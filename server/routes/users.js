import express from 'express'
import User from '../models/User.js'
import Devices from '../models/Devices.js'
import verifyToken from '../middleware/verifyToken.js'

const router = express.Router()

router.get('/users', verifyToken, async (req, res) => {
  try {
    const users = await User.find()
    res.json(users)
  } catch (err) {
    res.json({ status: 'error', error: 'Wystąpił błąd, spróbuj ponownie' })
  }
})

router.post('/user_active', verifyToken, async (req, res) => {
  try {
    const activeUser = await User.findOne({ email: req.body.email })
    const userDevice = await Devices.find({ status: activeUser.username})

    res.json({ activeUser, userDevice })
  } catch (err) {
    res.json({ status: 'error', error: 'Wystąpił błąd, spróbuj ponownie' })
  }
})

router.patch('/user_active/set_device', verifyToken, async (req, res) => {
  console.log(req.body);
  try {
    await Devices.findOneAndUpdate(
      { label: req.body.deviceToAssign },
      { status: req.body.username }
    )
    res.json({ status: 'ok' })
  } catch (err) {
    console.log(err);
    res.json({ status: 'error', error: 'Wystąpił błąd, spróbuj ponownie' })
  }
})

router.patch('/user_active/update_info', verifyToken, async (req, res) => {
  try {
    await User.findOneAndUpdate(
      { email: req.body.email },
      { phone: req.body.phone, additionalInfo: req.body.additionalInfo }
      )
    res.json({ status: 'ok' })
  } catch (err) {
    res.json({ status: 'error', error: 'Wystąpił błąd, spróbuj ponownie' })
  }
})

router.patch('/profile/update_info', verifyToken, async (req, res) => {

  const { username, email, profileEditInfo } = req.body

  try {
    if (username !== profileEditInfo.username) {
      const userActive = await User.findOne({ username: profileEditInfo.username})
      await userActive && res.send({ status: 'error', error: 'Taka nazwa użytkownika istnieje już w bazie' })
      const emailActive = await User.findOne({ email: profileEditInfo.email})
      await emailActive && res.send({ status: 'error', error: 'Taki email istnieje już w bazie' })
    }

    if (email !== profileEditInfo.email) {
      const emailActive = await User.findOne({ email: profileEditInfo.email})
      await emailActive && res.send({ status: 'error', error: 'Taki email istnieje już w bazie' })
    }

    const newInfo = await User.findOneAndUpdate(
      { email },
      { 
        username: profileEditInfo.username,
        firstName: profileEditInfo.firstName,
        lastName: profileEditInfo.lastName,
        email: profileEditInfo.email,
        phone: profileEditInfo.phone
      }
      )
    res.json({ status: 'ok', newInfo })
  } catch (err) {
    res.json({ status: 'error', error: 'Wystąpił błąd, spróbuj ponownie' })
  }
})

export default router