import express from 'express'
import { createDonation, createNotification, findDonationById, findUserById, getDonations, getDonationsByDonorId, getNotificationsByUserId, updateDonationStatus } from '../data/store.js'
import { requireAuth } from '../middleware/authMiddleware.js'
import { sendDonationAcceptedEmails } from '../services/emailService.js'

const router = express.Router()

router.post('/', requireAuth, async (req, res) => {
  try {
    const category = req.body.category || req.body.foodCategory || req.body.foodType
    const location = req.body.location || req.body.pickupLocation || req.body.pickupAddress

    if (!category || !req.body.quantity || !location) {
      return res.status(400).json({ message: 'Category, quantity, and location are required' })
    }

    const donation = await createDonation({
      ...req.body,
      category,
      location,
      foodType: req.body.foodType || category,
      pickupAddress: req.body.pickupAddress || location,
      donorId: req.user.id,
    })
    const donor = await findUserById(req.user.id)
    await createNotification({
      userId: req.user.id,
      message: `Thank you${donor ? `, ${donor.name}` : ''}! Your ${donation.category} donation was submitted successfully.`,
    })
    res.status(201).json(donation)
  } catch (error) {
    console.error('Failed to create donation:', error)
    res.status(500).json({ message: error.message })
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
    if (!donor?.email) {
      return res.status(422).json({ message: 'The donation donor does not have a valid email address' })
    }

    const donation = await updateDonationStatus(existingDonation.id, 'accepted')
    try {
      await sendDonationAcceptedEmails({ donor, donation })
    } catch (emailError) {
      await updateDonationStatus(existingDonation.id, existingDonation.status)
      throw emailError
    }

    await createNotification({
      userId: donor.id,
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
