import express from 'express'
import { createDonation, createNotification, findDonationById, findUserById, getDonations, getDonationsByDonorId, getNotificationsByUserId, updateDonationStatus } from '../data/store.js'
import { requireAuth } from '../middleware/authMiddleware.js'
import { sendDonationAcceptedEmails, sendNewDonationNotification } from '../services/emailService.js'

const router = express.Router()

router.post('/', requireAuth, async (req, res) => {
  try {
    const category = (req.body.category || req.body.foodCategory || req.body.foodType || '').trim()
    const quantity = (req.body.quantity || '').trim()
    const location = (req.body.pickupAddress || req.body.location || req.body.pickupLocation || '').trim()

    if (!category || !quantity || !location) {
      return res.status(400).json({ message: 'Food category, quantity, and pickup address are required.' })
    }

    const donation = await createDonation({
      foodType: req.body.foodType || category,
      category,
      quantity,
      location,
      pickupAddress: location,
      pickupTime: req.body.pickupTime || 'Flexible',
      notes: req.body.notes || '',
      donorId: req.user.id,
    })

    const foundDonor = await findUserById(req.user.id)
    const donor = foundDonor || { id: req.user.id, name: req.user.name || 'Donor', email: req.user.email || '' }

    // Notify user in-app
    try {
      await createNotification({
        userId: req.user.id,
        message: `Thank you, ${donor.name}! Your ${donation.category} donation was submitted successfully.`,
      })
    } catch (notifErr) {
      console.error('Non-fatal: In-app notification error:', notifErr)
    }

    // Send email notification to admin & donor
    try {
      await sendNewDonationNotification({ donor, donation })
    } catch (emailErr) {
      console.error('Non-fatal: Email notification error:', emailErr)
    }

    res.status(201).json(donation)
  } catch (error) {
    console.error('Failed to create donation:', error)
    res.status(500).json({ message: error.message || 'Server error while saving donation.' })
  }
})

router.get('/mine', requireAuth, async (req, res) => {
  try {
    res.json(await getDonationsByDonorId(req.user.id))
  } catch (error) {
    console.error('Failed to load user donations:', error)
    res.status(500).json({ message: error.message })
  }
})

router.get('/notifications', requireAuth, async (req, res) => {
  try {
    res.json(await getNotificationsByUserId(req.user.id))
  } catch (error) {
    console.error('Failed to load notifications:', error)
    res.status(500).json({ message: error.message })
  }
})

router.patch('/:id/accept', requireAuth, async (req, res) => {
  if (!['admin', 'ngo'].includes(req.user.role)) {
    return res.status(403).json({ message: 'Only an NGO or admin can accept a donation' })
  }

  try {
    const existingDonation = await findDonationById(req.params.id)
    if (!existingDonation) {
      return res.status(404).json({ message: 'Donation not found' })
    }
    if (existingDonation.status === 'accepted') {
      return res.status(409).json({ message: 'This donation has already been accepted' })
    }

    const donor = await findUserById(existingDonation.donorId)
    const donation = await updateDonationStatus(existingDonation.id, 'accepted')

    try {
      if (donor) {
        await sendDonationAcceptedEmails({ donor, donation })
      }
    } catch (emailError) {
      console.error('Email error on acceptance:', emailError)
    }

    await createNotification({
      userId: existingDonation.donorId,
      message: `Your ${donation.category} donation has been accepted by an NGO.`,
    })
    res.json({ message: 'Donation accepted and confirmation emails sent', donation })
  } catch (error) {
    console.error(`Failed to accept donation ${req.params.id}:`, error)
    res.status(500).json({ message: error.message || 'Unable to accept donation' })
  }
})

router.get('/', async (req, res) => {
  try {
    res.json(await getDonations())
  } catch (error) {
    console.error('Failed to load donations:', error)
    res.status(500).json({ message: error.message })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const donation = await findDonationById(req.params.id)
    if (!donation) {
      return res.status(404).json({ message: 'Donation not found' })
    }

    res.json(donation)
  } catch (error) {
    console.error(`Failed to load donation ${req.params.id}:`, error)
    res.status(500).json({ message: 'Unable to load donation details' })
  }
})

export default router
