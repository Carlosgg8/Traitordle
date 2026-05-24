import express from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import prisma from '../lib/prisma.js'
import 'dotenv/config'
import validateBody from '../middleware/validate.js'

const router = express.Router()

router.post('/register', validateBody(['email', 'username', 'password']), async (req, res, next) => {
  try {
    const { email, username, password } = req.body

    const existing = await prisma.user.findUnique({ where: { email } })
    if (existing) return res.status(400).json({ error: 'User already exists' })

    const passwordHash = await bcrypt.hash(password, 12)

    const user = await prisma.user.create({
      data: { email, username, passwordHash }
    })

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' })

    res.status(201).json({ token, user: { id: user.id, email: user.email, username: user.username } })
  } catch (err) {
    next(err)
  }
})

router.post('/login', validateBody(['password']), async (req, res, next) => {
  try {
    const { email, username, password } = req.body
    const identifier = email || username

    const existing = await prisma.user.findFirst({
        where: {
          OR: [
            { email: identifier },
            { username: identifier }
          ]
        }
      })



    if (!existing) return res.status(401).json({ error: 'invalid creedentials' })

    const isMatch = await bcrypt.compare(password, existing.passwordHash)

    if (!isMatch) return res.status(401).json({ error: 'invalid creedentials' })

    const token = jwt.sign({ id: existing.id }, process.env.JWT_SECRET, { expiresIn: '7d' })
    
    res.status(200).json({ token, user: { id: existing.id, email: existing.email, username: existing.username, streak: existing.streak, bestStreak: existing.bestStreak } })
  } catch (err) {
    next(err)
  }
})
export default router