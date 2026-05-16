import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import errorHandler from './middleware/errorHandler.js'
import authRouter from './routes/auth.js'
import puzzleRouter from './routes/puzzle.js'
import castRouter from './routes/cast.js'
import scoreRouter from './routes/score.js'
import leaderboardRouter from './routes/leaderboard.js'

const app = express()

app.use(cors())
app.use(express.json())

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' })
})

app.use('/api/auth', authRouter)
app.use('/api/puzzle', puzzleRouter)
app.use('/api/cast', castRouter)
app.use('/api/score', scoreRouter)
app.use('/api/leaderboard', leaderboardRouter)

app.use(errorHandler)

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})