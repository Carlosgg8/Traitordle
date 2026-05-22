import express from 'express'
import prisma from '../lib/prisma.js'
import authenticateToken from '../middleware/auth.js'

const router = express.Router()

router.post('/', authenticateToken, async (req, res, next) => {
  try {
    
    const { puzzleId, guessCount, won } = req.body

    const score = await prisma.score.create({
    data: {
        userId: req.user.id,
        puzzleId: parseInt(puzzleId),
        guessCount: parseInt(guessCount),
        won: won
    }
    })

    const user = await prisma.user.findUnique({ where: { id: req.user.id } })

    if (won) {
        const yesterday = new Date()
        yesterday.setUTCHours(0, 0, 0, 0)
        yesterday.setUTCDate(yesterday.getUTCDate() - 1)

        const yesterdayEnd = new Date(yesterday)
        yesterdayEnd.setUTCDate(yesterdayEnd.getUTCDate() + 1)

        // then check if user has a won score from yesterday
        const yesterdayScore = await prisma.score.findFirst({
        where: {
            userId: req.user.id,
            won: true,
            createdAt: { gte: yesterday, lt: yesterdayEnd }
        }
        })

        console.log('won:', won)
        console.log('user before update:', user)
        console.log('yesterdayScore:', yesterdayScore)

        if (yesterdayScore) {
        // increment streak
        await prisma.user.update({
            where: { id: req.user.id },
            data: {
            streak: { increment: 1 },
            bestStreak: user.streak + 1 > user.bestStreak ? user.streak + 1 : user.bestStreak
            }
        })

        
        } else {
          const updated = await prisma.user.update({
            where: { id: req.user.id },
            data: {
              streak: 1,
              bestStreak: user.bestStreak < 1 ? 1 : user.bestStreak
            }
          })
          console.log('updated user:', updated)
        }
    }


    res.status(201).json(score)
    
  } catch (err) {
    next(err)
  }
})

router.get('/today', authenticateToken, async (req, res, next) => {
  try {
    const today = new Date()
    today.setUTCHours(0, 0, 0, 0)

    const tomorrow = new Date(today)
    tomorrow.setUTCDate(tomorrow.getUTCDate() + 1)

    const score = await prisma.score.findFirst({
      where: {
        userId: req.user.id,
        createdAt: { gte: today, lt: tomorrow }
      }
    })

    res.status(200).json(score || null)

  } catch (err) {
    next(err)
  }
})


router.get('/profile', authenticateToken, async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({ where: { id: req.user.id } })

    const totalGames = await prisma.score.count({
      where: { userId: req.user.id }
    })

    // total wins
    const totalWins = await prisma.score.count({
      where: { userId: req.user.id, won: true }
    })

    // win rate
    const winRate = totalGames > 0 ? Math.round((totalWins / totalGames) * 100) : 0

    res.status(200).json({
      email: user.email,
      username: user.username,
      streak: user.streak,
      bestStreak: user.bestStreak,
      totalGames,
      totalWins,
      winRate
    })

    

  } catch (err) {
    next(err)
  }
})





export default router