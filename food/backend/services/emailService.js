import nodemailer from 'nodemailer'

const getTransporter = () => {
  const missing = ['SMTP_USER', 'SMTP_PASS'].filter((setting) => !process.env[setting])
  if (missing.length > 0) {
    return null
  }

  const user = process.env.SMTP_USER.trim()
  const pass = process.env.SMTP_PASS.replace(/\s+/g, '')
  const host = (process.env.SMTP_HOST || '').trim()

  const isGmail = host.includes('gmail') || user.includes('@gmail.com')

  if (isGmail) {
    return nodemailer.createTransport({
      service: 'gmail',
      auth: { user, pass },
    })
  }

  return nodemailer.createTransport({
    host: host || 'smtp.gmail.com',
    port: Number(process.env.SMTP_PORT || 587),
    secure: process.env.SMTP_SECURE === 'true',
    auth: { user, pass },
  })
}

export const sendOtpEmail = async ({ email, otp }) => {
  const transporter = getTransporter()
  const sender = process.env.SMTP_FROM || `"FoodBridge Team" <${process.env.SMTP_USER}>`
  const subject = `Your FoodBridge Login OTP: ${otp}`
  const message = `Hello,\n\nYour one-time login passcode for FoodBridge is:\n\n${otp}\n\nThis code will expire in 10 minutes. If you did not request this, please ignore this email.\n\nWarm regards,\nFoodBridge Team`

  console.log('\n========================================')
  console.log(`[EMAIL SERVICE] OTP for ${email}: ${otp}`)
  console.log('========================================\n')

  if (!transporter) {
    console.log('[EMAIL SERVICE] SMTP not configured. OTP code output above.')
    return { sent: false, mode: 'console' }
  }

  try {
    const info = await transporter.sendMail({ from: sender, to: email, subject, text: message })
    console.log(`[EMAIL SERVICE] OTP Email sent successfully to ${email}. Message ID: ${info.messageId}`)
    return { sent: true, mode: 'smtp', messageId: info.messageId }
  } catch (error) {
    console.error(`[EMAIL SERVICE ERROR] Failed to send OTP email to ${email}:`, error)
    return { sent: false, error: error.message, mode: 'failed' }
  }
}

export const sendNewDonationNotification = async ({ donor, donation }) => {
  const transporter = getTransporter()
  const adminEmail = process.env.ADMIN_EMAIL || process.env.SMTP_USER || 'admin@foodbridge.org'
  const sender = process.env.SMTP_FROM || `"FoodBridge Team" <${process.env.SMTP_USER}>`

  const subject = `🎁 New Food Donation Submitted (#${donation.id.slice(0, 8)})`
  const adminBody = `A new food donation has been submitted on FoodBridge!

Donation Details:
-----------------
ID: ${donation.id}
Category: ${donation.category || donation.foodType}
Quantity: ${donation.quantity}
Pickup Location: ${donation.pickupAddress || donation.location}
Preferred Time: ${donation.pickupTime || 'N/A'}
Notes: ${donation.notes || 'None'}

Donor Info:
-----------
Name: ${donor?.name || 'Anonymous Donor'}
Email: ${donor?.email || 'N/A'}

Submitted At: ${donation.createdAt}
Status: ${donation.status}
`

  console.log('\n========================================')
  console.log(`[EMAIL SERVICE] NEW DONATION ALERT for Admin (${adminEmail})`)
  console.log(`Category: ${donation.category} | Quantity: ${donation.quantity}`)
  console.log(`Donor: ${donor?.name} (${donor?.email})`)
  console.log('========================================\n')

  if (!transporter) {
    console.log('[EMAIL SERVICE] SMTP not configured. Admin notification logged to console above.')
    return
  }

  try {
    await transporter.sendMail({
      from: sender,
      to: adminEmail,
      subject,
      text: adminBody,
    })

    if (donor?.email) {
      await transporter.sendMail({
        from: sender,
        to: donor.email,
        subject: `Thank you for your food donation! (#${donation.id.slice(0, 8)})`,
        text: `Hello ${donor.name},\n\nThank you for donating food through FoodBridge!\n\nYour donation of ${donation.quantity} (${donation.category}) has been listed. Nearby NGOs will be notified shortly.\n\nRegards,\nFoodBridge Team`,
      })
    }
  } catch (error) {
    console.error(`[EMAIL SERVICE ERROR] Failed to send new donation alert email:`, error)
  }
}

export const sendDonationAcceptedEmails = async ({ donor, donation }) => {
  if (!donor?.email) throw new Error('The donor does not have an email address')

  const transporter = getTransporter()
  const sender = process.env.SMTP_FROM || `"FoodBridge Team" <${process.env.SMTP_USER}>`
  const adminEmail = process.env.ADMIN_EMAIL || process.env.SMTP_USER || 'admin@foodbridge.org'

  const donorMessage = `Hello ${donor.name},\n\nYour food donation has been successfully accepted by an NGO.\n\nDonation ID: ${donation.id}\nStatus: Accepted\n\nThank you for helping reduce food waste and feeding people in need.\n\nRegards,\nFoodBridge Team`
  const adminMessage = `A food donation has been accepted.\n\nDonor: ${donor.name}\nDonation ID: ${donation.id}\nCategory: ${donation.category}\nLocation: ${donation.location}\nStatus: Accepted`

  console.log('\n========================================')
  console.log(`[EMAIL SERVICE] Donation ${donation.id} ACCEPTED by NGO`)
  console.log('========================================\n')

  if (!transporter) {
    console.log('[EMAIL SERVICE] SMTP not configured. Acceptance logged to console.')
    return
  }

  try {
    await Promise.all([
      transporter.sendMail({ from: sender, to: donor.email, subject: 'Food Donation Accepted', text: donorMessage }),
      transporter.sendMail({ from: sender, to: adminEmail, subject: 'New Donation Accepted', text: adminMessage }),
    ])
  } catch (error) {
    console.error(`[EMAIL SERVICE ERROR] Failed to send acceptance emails for donation ${donation.id}:`, error)
  }
}
