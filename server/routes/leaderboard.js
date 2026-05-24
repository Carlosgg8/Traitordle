import express from 'express'
import prisma from '../lib/prisma.js'
import authenticateToken from '../middleware/auth.js'

const router = express.Router()

router.get('/', async (req, res, next) => {
  try {
    

    const first20 = await prisma.user.findMany({
      take: 10,
        orderBy: {
            bestStreak: 'desc',
        },
    })

    const ranked = first20.map((user, index) => ({
        rank: index + 1,
        username: user.username,
        bestStreak: user.bestStreak,
        streak: user.streak
    }))

    res.status(200).json(ranked)



  } catch (err) {
    next(err)
  }
})

export default router