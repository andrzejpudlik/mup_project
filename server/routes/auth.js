import express from 'express'
import User from '../models/User.js'
import CryptoJS from 'crypto-js'
import jwt from 'jsonwebtoken'

const router = express.Router()

router.post('/api/register', async (req, res) => {
  try {
    const user = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: CryptoJS.AES.encrypt(
        req.body.password,
        process.env.SECRET_KEY
      ).toString(),
      firstName: req.body.firstName,
      lastName: req.body.lastName
    })
    res.json({ status: 'ok', user })
  } catch (err) {
    res.json({ status: 'error', error: 'Taka nazwa użytkownika lub email już istnieje' })
  }
})

router.post('/api/login', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username})
    !user && res.json({ status: 'error', error: 'Nieprawidłowa nazwa lub hasło' })

    const bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY)
    const originalPassword = bytes.toString(CryptoJS.enc.Utf8)

    originalPassword !== req.body.password &&
      res.json({ status: 'error', error: 'Nieprawidłowa nazwa lub hasło' })

    const accessToken = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.SECRET_KEY,
      { expiresIn: '1d' }
    )

    const { password, ...info } = user._doc

    res
    .cookie('token', accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    })
    .json({ status: 'ok', ...info, accessToken });
  } catch (err) {
    res.json({ status: 'error', error: 'Wystąpił błąd, spróbuj ponownie' })
  }
})

router.get('/api/logout', (req, res) => {
  res
    .cookie('token', '', {
      httpOnly: true,
      expires: new Date(0),
      secure: true,
      sameSite: 'none',
    })
    .send();
});

router.get('/api/loggedIn', async (req, res) => {
  try {
    const token = req.cookies.token
    if (!token) return res.json(false)

    jwt.verify(token, process.env.SECRET_KEY)

    const decoded = jwt.decode(token)
    const user = await User.findOne({ _id: decoded.id})

    res.send({ isLogged : true, user })
  } catch (err) {
    res.json({ isLogged: false })
  }
});

export default router