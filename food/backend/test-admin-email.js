import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'
import nodemailer from 'nodemailer'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: path.resolve(__dirname, '../.env') })
dotenv.config({ path: path.resolve(__dirname, './.env') })

console.log('Testing Admin Email to:', process.env.ADMIN_EMAIL)

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.SMTP_USER.trim(),
    pass: process.env.SMTP_PASS.replace(/\s+/g, ''),
  },
})

try {
  const info = await transporter.sendMail({
    from: `"FoodBridge Alert" <${process.env.SMTP_USER}>`,
    to: process.env.ADMIN_EMAIL,
    subject: '🎁 Test Food Donation Alert for Admin',
    text: 'A test food donation was submitted!\nCategory: Fresh Vegetables\nQuantity: 10 boxes\nAddress: 123 Main St',
  })
  console.log('ADMIN EMAIL SENT SUCCESSFULLY! Message ID:', info.messageId)
} catch (err) {
  console.error('ADMIN EMAIL ERROR:', err)
}
