import React from "react"

export default function ResultModal({ won, guessCount, streak, onShare, onClose, answer }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {won ? <h2 className="modal-title won">You got it!</h2> : <h2 className="modal-title lost">Better luck tomorrow!</h2>}
        <p className="modal-guesses">{guessCount}/8 guesses</p>
        {!won && answer && <p className="modal-answer">The answer was: <strong>{answer}</strong></p>}
        {streak && <p className="modal-streak">Current streak: {streak}</p>}
        <button className="modal-share" onClick={onShare}>Share</button>
      </div>
    </div>
  )
}