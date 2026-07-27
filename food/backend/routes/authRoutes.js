import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { createUser, findUserByEmail, saveOtp, verifyOtpCode } from '../data/store.js'
import { sendOtpEmail } from '../services/emailService.js'
import { JWT_SECRET } from '../middleware/authMiddleware.js'

const router = express.Router()
const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email?.trim())

/**
 * Step 1 of OTP Login:
 * Check if the email exists in the database.
 * If user exists -> Generate 6-digit OTP code & send to that email via Nodemailer.
 * If user does NOT exist -> Return 404 error asking user to register first.
 */
router.post('/send-otp', async (req, res) => {
  try {
    const { email } = req.body
    if (!email || !isValidEmail(email)) {
      return res.status(400).json({ message: 'Please provide a valid email address' })
    }

    const cleanEmail = email.trim().toLowerCase()

    // 1. Verify that email exists in the database
    const user = await findUserByEmail(cleanEmail)
    if (!user) {
      return res.status(404).json({
        message: 'No account found with this email address. Please register an account first.',
      })
    }

    // 2. Generate 6-digit OTP code
    const otp = Math.floor(100000 + Math.random() * 900000).toString()

    // 3. Save OTP in store with 10-minute expiry
    await saveOtp(cleanEmail, otp, 10)

    // 4. Send OTP email to the user's email address
    const emailResult = await sendOtpEmail({ email: cleanEmail, otp })

    if (emailResult.mode === 'failed') {
      return res.status(500).json({
        message: `Failed to deliver OTP email: ${emailResult.error || 'SMTP delivery failed'}`,
      })
    }

    res.json({
      message: `OTP login code sent to ${cleanEmail}. Please check your inbox.`,
      sentVia: emailResult.mode,
      ...(emailResult.mode === 'console' ? { devNote: 'SMTP not configured. OTP printed to server terminal.' } : {}),
    })
  } catch (error) {
    console.error('Send OTP error:', error)
    res.status(500).json({ message: 'Failed to process OTP request. Please try again.' })
  }
})

/**
 * Step 2 of OTP Login:
 * Verify 6-digit code for existing user and return JWT token.
 */
router.post('/verify-otp', async (req, res) => {
  try {
    const { email, otp } = req.body
    if (!email || !isValidEmail(email)) {
      return res.status(400).json({ message: 'Please provide a valid email address' })
    }
    if (!otp || otp.trim().length !== 6) {
      return res.status(400).json({ message: 'Enter a valid 6-digit OTP code' })
    }

    const cleanEmail = email.trim().toLowerCase()

    // Verify user exists in database
    const user = await findUserByEmail(cleanEmail)
    if (!user) {
      return res.status(404).json({ message: 'No account found with this email address. Please register first.' })
    }

    // Verify OTP code validity
    const result = await verifyOtpCode(cleanEmail, otp)
    if (!result.valid) {
      return res.status(400).json({ message: result.reason })
    }

    const token = jwt.sign({ id: user.id, role: user.role, email: user.email, name: user.name }, JWT_SECRET, { expiresIn: '30d' })

    res.json({
      token,
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
      message: 'Logged in successfully with OTP',
    })
  } catch (error) {
    console.error('Verify OTP error:', error)
    res.status(500).json({ message: 'Verification failed. Please try again.' })
  }
})

router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role } = req.body
    if (!name || !name.trim()) {
      return res.status(400).json({ message: 'Name is required' })
    }
    if (!email || !isValidEmail(email)) {
      return res.status(400).json({ message: 'Please enter a valid email address' })
    }
    if (!password || password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters' })
    }

    const cleanEmail = email.trim().toLowerCase()
    const existing = await findUserByEmail(cleanEmail)
    if (existing) {
      return res.status(400).json({ message: 'An account with this email already exists' })
    }

    const user = await createUser({
      name: name.trim(),
      email: cleanEmail,
      password: await bcrypt.hash(password, 10),
      role: role || 'donor',
    })

    const token = jwt.sign({ id: user.id, role: user.role, email: user.email, name: user.name }, JWT_SECRET, { expiresIn: '30d' })

    res.status(201).json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } })
  } catch (error) {
    res.status(400).json({ message: error.message || 'Registration failed' })
  }
})

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' })
    }
    if (!isValidEmail(email)) {
      return res.status(400).json({ message: 'Enter a valid email address' })
    }

    const cleanEmail = email.trim().toLowerCase()
    const user = await findUserByEmail(cleanEmail)

    if (!user || !user.password || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: 'Invalid email or password' })
    }

    const token = jwt.sign({ id: user.id, role: user.role, email: user.email, name: user.name }, JWT_SECRET, { expiresIn: '30d' })
    res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } })
  } catch (error) {
    res.status(500).json({ message: error.message || 'Login failed' })
  }
})

export default router
