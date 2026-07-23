import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import authRoutes from './routes/authRoutes.js'
import donationRoutes from './routes/donationRoutes.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json({ limit: '1mb' }))

connectDB()

app.get('/', (req, res) => {
  res.send('Food Donations API is running')
})

app.use('/api/auth', authRoutes)
app.use('/api/donations', donationRoutes)

app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({ message: 'Invalid JSON payload' })
  }

  next(err)
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
