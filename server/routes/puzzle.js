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

router.post('/guess', async (req, res, next) => {
  try {
    
    const { puzzleId, castMemberId } = req.body

    console.log('body:', req.body)
    console.log('puzzleId:', puzzleId)

    const puzzle = await prisma.dailyPuzzle.findUnique({
      where: { id: parseInt(puzzleId) },
      include: { castMember: { include: { season: true } } }
    })

    if (!puzzle) return res.status(404).json({ error: 'Puzzle not found' })

    // find the guessed cast member
    const guess = await prisma.castMember.findUnique({
      where: { id: castMemberId },
      include: { season: true }
    })

    if (!guess) return res.status(404).json({ error: 'Cast member not found' })

    const answer = puzzle.castMember

    const comparison = {
      isTraitor: {
        value: guess.isTraitor,
        result: guess.isTraitor === answer.isTraitor ? 'correct' : 'wrong'
      },
      season: {
        value: guess.season.number,
        result: guess.season.number === answer.season.number ? 'correct' : 
                Math.abs(guess.season.number - answer.season.number) <= 1 ? 'close' : 'wrong'
      },
      country: {
        value: guess.season.country,
        result: guess.season.country === answer.season.country ? 'correct' : 'wrong'
      },
      placement: {
        value: guess.placement,
        result: guess.placement === answer.placement ? 'correct' :
                Math.abs(guess.placement - answer.placement) <= 3 ? 'close' : 'wrong',
        direction: guess.placement > answer.placement ? 'lower' : guess.placement < answer.placement ? 'higher' : null
      },
      age: {
        value: guess.age,
        result: guess.age === answer.age ? 'correct' :
                Math.abs(guess.age - answer.age) <= 3 ? 'close' : 'wrong',
        direction: guess.age > answer.age ? 'lower' : guess.age < answer.age ? 'higher' : null
      }
    }

    res.status(200).json({ guess: guess.name, comparison })


    
  } catch (err) {
    next(err)
  }
})


export default router