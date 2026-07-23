import { randomUUID } from 'crypto'
import { readFile, writeFile } from 'fs/promises'
import { fileURLToPath } from 'url'

const dataFile = fileURLToPath(new URL('./foodbridge-data.json', import.meta.url))

const loadData = async () => {
  try {
    return JSON.parse(await readFile(dataFile, 'utf8'))
  } catch (error) {
    if (error.code === 'ENOENT') return { users: [], donations: [], notifications: [] }
    throw error
  }
}

const data = await loadData()
const users = Array.isArray(data.users) ? data.users : []
const donations = Array.isArray(data.donations) ? data.donations : []
const notifications = Array.isArray(data.notifications) ? data.notifications : []
const saveData = () => writeFile(dataFile, JSON.stringify({ users, donations, notifications }, null, 2))

const normalizeDonation = (donation) => {
  const category = donation.category || donation.foodCategory || donation.foodType || 'Uncategorized'
  const location = donation.location || donation.pickupLocation || donation.pickupAddress || 'Location not provided'

  return {
    ...donation,
    foodType: donation.foodType || category,
    category,
    location,
    pickupAddress: donation.pickupAddress || location,
    status: donation.status || 'pending',
  }
}

export const createUser = async ({ name, email, password, role }) => {
  const existingUser = users.find((user) => user.email === email)
  if (existingUser) {
    throw new Error('User already exists')
  }

  const user = {
    id: randomUUID(),
    name,
    email,
    password,
    role: role || 'donor',
    createdAt: new Date().toISOString(),
  }

  users.push(user)
  await saveData()
  return user
}

export const findUserByEmail = async (email) => users.find((user) => user.email === email) || null

export const findUserById = async (id) => users.find((user) => user.id === id) || null

export const createDonation = async (payload) => {
  const donation = normalizeDonation({
    id: randomUUID(),
    ...payload,
    status: 'pending',
    createdAt: new Date().toISOString(),
  })

  donations.push(donation)
  await saveData()
  return donation
}

export const getDonations = async () => donations.map((donation) => ({
  ...normalizeDonation(donation),
  donor: users.find((user) => user.id === donation.donorId) || null,
}))

export const getDonationsByDonorId = async (donorId) => donations
  .filter((donation) => donation.donorId === donorId)
  .map(normalizeDonation)

export const findDonationById = async (id) => {
  const donation = donations.find((item) => item.id === id)
  return donation ? normalizeDonation(donation) : null
}

export const updateDonationStatus = async (id, status) => {
  const donation = donations.find((item) => item.id === id)
  if (!donation) return null

  donation.status = status
  donation.updatedAt = new Date().toISOString()
  await saveData()
  return normalizeDonation(donation)
}

export const createNotification = async ({ userId, message }) => {
  const notification = {
    id: randomUUID(),
    userId,
    message,
    createdAt: new Date().toISOString(),
  }

  notifications.unshift(notification)
  await saveData()
  return notification
}

export const getNotificationsByUserId = async (userId) => notifications.filter((notification) => notification.userId === userId)
