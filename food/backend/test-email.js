import dotenv from 'dotenv'
import nodemailer from 'nodemailer'

dotenv.config()

console.log('Testing SMTP with settings:')
console.log('USER:', process.env.SMTP_USER)
console.log('PASS:', process.env.SMTP_PASS ? '*****' : 'MISSING')
console.log('HOST:', process.env.SMTP_HOST)

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.SMTP_USER.trim(),
    pass: process.env.SMTP_PASS.replace(/\s+/g, ''),
  },
})

try {
  console.log('Verifying transport connection...')
  await transporter.verify()
  console.log('SMTP Connection SUCCESSFUL!')

  console.log('Sending test mail...')
  const info = await transporter.sendMail({
    from: `"FoodBridge Test" <${process.env.SMTP_USER}>`,
    to: process.env.SMTP_USER,
    subject: 'FoodBridge Test Email OTP',
    text: 'Your test OTP code is: 999888',
  })
  console.log('Email SENT SUCCESSFULLY! Message ID:', info.messageId)
} catch (err) {
  console.error('SMTP ERROR:', err)
}
