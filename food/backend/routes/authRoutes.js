import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { createUser, findUserByEmail } from '../data/store.js'

const router = express.Router()

router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role } = req.body
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email, and password are required' })
    }
    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters' })
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      return res.status(400).json({ message: 'Enter a valid email address' })
    }

    const user = await createUser({
      name,
      email: email.trim().toLowerCase(),
      password: await bcrypt.hash(password, 10),
      role,
    })
    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' })

    res.status(201).json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' })
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      return res.status(400).json({ message: 'Enter a valid email address' })
    }

    const user = await findUserByEmail(email.trim().toLowerCase())
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: 'Invalid credentials' })
    }

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' })
    res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

export default router
