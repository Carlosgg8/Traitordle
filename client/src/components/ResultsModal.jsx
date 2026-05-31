import React from "react"

export default function ResultModal({ won, guessCount, streak, onShare }) {
  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(0,0,0,0.5)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      zIndex: 100
    }}>
      <div style={{
        background: 'white', borderRadius: '12px',
        padding: '32px', textAlign: 'center', minWidth: '300px'
      }}>
        {won ? <h2>🎉 You got it!</h2> : <h2>😔 Better luck tomorrow!</h2>}
        <p>{guessCount}/8 guesses</p>
        {streak && <p>Current streak: {streak} 🔥</p>}
        <button onClick={onShare}>Share 📋</button>
      </div>
    </div>
  )
}