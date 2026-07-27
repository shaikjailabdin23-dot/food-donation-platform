import path from 'path'
import { fileURLToPath } from 'url'
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import authRoutes from './routes/authRoutes.js'
import donationRoutes from './routes/donationRoutes.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Load .env from parent directory (food/.env) or current directory (backend/.env)
dotenv.config({ path: path.resolve(__dirname, '../.env') })
dotenv.config({ path: path.resolve(__dirname, './.env') })

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

// System design updated: async admin email & stable 30-day session token
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({ message: 'Invalid JSON payload' })
  }

  next(err)
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
  console.log(`[SMTP CONFIG CHECK] User: ${process.env.SMTP_USER || 'NOT SET'}, Host: ${process.env.SMTP_HOST || 'NOT SET'}`)
})
