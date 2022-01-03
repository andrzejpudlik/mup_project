import cors from 'cors'
import express from 'express'
import cookieParser from 'cookie-parser'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

import authRoute from './routes/auth.js'
import typeDeviceRoute from './routes/typeDevices.js'
import deviceRoute from './routes/devices.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 4000

app.use(express.json())
app.use(cookieParser())
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}))

mongoose
  .connect(process.env.MONGO_URL)
    .then(() => console.log('DB Connection'))
    .catch((err) => console.log(err))

app.use('/', authRoute)
app.use('/', typeDeviceRoute)
app.use('/', deviceRoute)

app.listen(PORT, () => console.log(`Server started on port: ${PORT}`))