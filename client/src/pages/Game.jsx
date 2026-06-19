import { useState, useEffect } from "react"
import { useAuth } from "../context/AuthContext.jsx"
import api from '../api.js'
import SearchInput from "../components/SearchInput.jsx"
import GuessGrid from "../components/GuessGrid.jsx"
import ResultModal from "../components/ResultsModal.jsx"
import Avatar from "../components/Avatar.jsx"
import HowToPlay from "../components/HowToPlay.jsx"

export default function Game() {
    const { user } = useAuth()
    const [puzzleId, setPuzzleId] = useState(null)
    const [guesses, setGuesses] = useState([])
    const [gameOver, setGameOver] = useState(false)
    const [won, setWon] = useState(false)
    const [showModal, setShowmodal] = useState(false)
    const [loading, setLoading] = useState(true)
    const [showHowToPlay, setShowHowToPlay] = useState(false)
    const [answer, setAnswer] = useState(null)

    useEffect(() => {
        const init = async () => {
        const puzzleRes = await api.get('/api/puzzle/today')
        setPuzzleId(puzzleRes.data.puzzleId)
        setLoading(false)

        if (user) {
            const scoreRes = await api.get('/api/score/today')
            if (scoreRes.data) {
            setGameOver(true)
            setWon(scoreRes.data.won)
            }
        }
        const hasPlayed = localStorage.getItem('hasVisited')
        if (!hasPlayed) {
            setShowHowToPlay(true)
            localStorage.setItem('hasVisited', 'true')
        }

        }
        init()
    }, []) 

    const handleGuess = async (castMember) => {
        if (gameOver) {
            setShowmodal(true)
            return
        }

        if (!puzzleId) return

        const res = await api.post('/api/puzzle/guess', {
        puzzleId,
        castMemberId: castMember.id
        })

        const newGuesses = [...guesses, res.data]
        setGuesses(newGuesses)

        const allCorrect = Object.values(res.data.comparison).every(c => c.result === 'correct')

        if (allCorrect) {
            setWon(true)
            setGameOver(true)
            setShowmodal(true)
            if (user) {
                await api.post('/api/score', {
                    puzzleId,
                    guessCount: newGuesses.length,
                    won: true
                })
            }
            return
        }

        if (newGuesses.length >= 8) {
            setGameOver(true)
            setShowmodal(true)
            try {
                const answerRes = await api.get('/api/puzzle/answer')
                setAnswer(answerRes.data.name)
            } catch (err) {
                // ignore; answer not critical
            }
            if (user) {
                await api.post('/api/score', {
                    puzzleId,
                    guessCount: newGuesses.length,
                    won: false
                })
            }
        }
    }

    const onShare = async () => {
        const emojiMap = { correct: '🟩', close: '🟨', wrong: '⬜' }
        
        const text = guesses.map(g => 
            Object.values(g.comparison)
            .map(c => emojiMap[c.result])
            .join('')
        ).join('\n')

        await navigator.clipboard.writeText(`Traitordle\n${text}`)
        alert('Copied to clipboard!')
    }

    // When the results modal opens and the player didn't win, ensure we fetch the answer
    useEffect(() => {
        if (!showModal || won) return
        if (answer) return

        let cancelled = false
        ;(async () => {
            try {
                const answerRes = await api.get('/api/puzzle/answer')
                if (!cancelled) setAnswer(answerRes.data.name)
            } catch (err) {
                // ignore
            }
        })()

        return () => { cancelled = true }
    }, [showModal, won, answer])

    return (
        <div className="game-container">
            <h1 className="game-title">Traitordle</h1>
            <p className="game-subtitle">Guess today's Traitors cast member</p>

            <div className="legend">
            <div className="legend-item">
                <div className="legend-dot" style={{ background: '#16a34a' }}></div>
                <span>Exact match</span>
            </div>
            <div className="legend-item">
                <div className="legend-dot" style={{ background: '#ca8a04' }}></div>
                <span>Close</span>
            </div>
            <div className="legend-item">
                <div className="legend-dot" style={{ background: '#3a3a3a' }}></div>
                <span>No match</span>
            </div>
            </div>

            <SearchInput onSelect={handleGuess} disabled={gameOver || loading} />
            <GuessGrid guesses={guesses} />
            {showModal && <ResultModal won={won} guessCount={guesses.length} streak={user?.streak} onShare={onShare} onClose={() => setShowmodal(false)} answer={answer}/>}
            {showHowToPlay && <HowToPlay onClose={() => setShowHowToPlay(false)} />}
        </div>
    )
}