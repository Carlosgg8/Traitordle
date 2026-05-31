import { useState, useEffect } from "react"
import { useAuth } from "../context/AuthContext.jsx"
import api from '../api.js'
import SearchInput from "../components/SearchInput.jsx"
import GuessGrid from "../components/GuessGrid.jsx"
import ResultModal from "../components/ResultsModal.jsx"
import Avatar from "../components/Avatar.jsx"

export default function Game() {
    const { user } = useAuth()
    const [puzzleId, setPuzzleId] = useState(null)
    const [guesses, setGuesses] = useState([])
    const [gameOver, setGameOver] = useState(false)
    const [won, setWon] = useState(false)
    const [showModal, setShowmodal] = useState(false)

    useEffect(() => {
        const init = async () => {
        const puzzleRes = await api.get('/api/puzzle/today')
        setPuzzleId(puzzleRes.data.puzzleId)

        if (user) {
            const scoreRes = await api.get('/api/score/today')
            if (scoreRes.data) {
            setGameOver(true)
            setWon(scoreRes.data.won)
            }
        }
        }
        init()
    }, [])

    const handleGuess = async (castMember) => {
        if (gameOver) {
            setShowmodal(true)
            return
        }

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
            } else if (newGuesses.length >= 8) {
            setGameOver(true)
            setShowmodal(true)
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

    return (
        <div>
        <h1>Traitordle</h1>
        <SearchInput onSelect={handleGuess} disabled={gameOver} />
        <GuessGrid guesses={guesses} />
        {showModal && <ResultModal won={won} guessCount={guesses.length} 
        streak={user?.streak} onShare={onShare} />}
        </div>
    )
}