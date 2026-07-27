import jwt from 'jsonwebtoken'

export const JWT_SECRET = process.env.JWT_SECRET || 'foodbridge_stable_secret_2026'

export function requireAuth(req, res, next) {
  const authorization = req.headers.authorization || ''
  const token = authorization.startsWith('Bearer ') ? authorization.slice(7) : null

  if (!token) {
    return res.status(401).json({ message: 'Authentication is required' })
  }

  try {
    req.user = jwt.verify(token, JWT_SECRET)
    next()
  } catch (err) {
    console.error('[AUTH MIDDLEWARE] Token verification failed:', err.message)
    return res.status(401).json({ message: 'Your session has expired. Please sign in again.' })
  }
}
