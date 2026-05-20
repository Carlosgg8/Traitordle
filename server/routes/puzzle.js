import express from 'express'
import prisma from '../lib/prisma.js'

const router = express.Router()

router.get('/today', async (req, res, next) => {
  try {
    const today = new Date()
    today.setUTCHours(0, 0, 0, 0)

    const tomorrow = new Date(today)
    tomorrow.setUTCDate(tomorrow.getUTCDate() + 1)

    const puzzle = await prisma.dailyPuzzle.findFirst({
        where: {
            date: { gte: today, lt: tomorrow }
        }
        })

    if (!puzzle) return res.status(401).json({ error: 'Puzzle error' })

    res.status(200).json({ puzzleId: puzzle.id, totalCastCount: await prisma.castMember.count() })

    
  } catch (err) {
    next(err)
  }
})

export default router