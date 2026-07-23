import nodemailer from 'nodemailer'

const requiredSettings = ['SMTP_HOST', 'SMTP_PORT', 'SMTP_USER', 'SMTP_PASS', 'SMTP_FROM', 'ADMIN_EMAIL']

const getTransporter = () => {
  const missing = requiredSettings.filter((setting) => !process.env[setting])
  if (missing.length) {
    throw new Error(`Email service is not configured. Missing: ${missing.join(', ')}`)
  }

  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: process.env.SMTP_SECURE === 'true',
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  })
}

export const sendDonationAcceptedEmails = async ({ donor, donation }) => {
  if (!donor?.email) throw new Error('The donor does not have an email address')

  const transporter = getTransporter()
  const sender = process.env.SMTP_FROM
  const donorMessage = `Hello ${donor.name},\n\nYour food donation has been successfully accepted by an NGO.\n\nDonation ID: ${donation.id}\nStatus: Accepted\n\nThank you for helping reduce food waste and feeding people in need.\n\nRegards,\nFoodBridge Team`
  const adminMessage = `A food donation has been accepted.\n\nDonor: ${donor.name}\nDonation ID: ${donation.id}\nCategory: ${donation.category}\nLocation: ${donation.location}\nStatus: Accepted`

  try {
    await Promise.all([
      transporter.sendMail({ from: sender, to: donor.email, subject: 'Food Donation Accepted', text: donorMessage }),
      transporter.sendMail({ from: sender, to: process.env.ADMIN_EMAIL, subject: 'New Donation Accepted', text: adminMessage }),
    ])
  } catch (error) {
    console.error(`Failed to send acceptance emails for donation ${donation.id}:`, error)
    throw new Error('Donation was not accepted because the confirmation emails could not be sent')
  }
}
