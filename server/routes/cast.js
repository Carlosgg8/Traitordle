import express from 'express'
import prisma from '../lib/prisma.js'

const router = express.Router()

router.get('/search', async (req, res, next) => {
  try {
    const q = req.query.q

    if (!q) return res.status(200).json([])

    const results = await prisma.castMember.findMany({
      where: {
        name: { contains: q, mode: 'insensitive' }
      },
      include: { season: true },
      take: 8
    })

    res.status(200).json(results.map(member => ({
      id: member.id,
      name: member.name,
      season: { number: member.season.number, country: member.season.country }
    })))

  } catch (err) {
    next(err)
  }
})

export default router