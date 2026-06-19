import React from 'react'

export default function HowToPlay({ onClose }) {
    return (
        <div className="modal-overlay">
        <div className="modal-content">
            <h2 className="modal-title">How to Play</h2>
            
            <p className="howtoplay-description">
            Guess today's Traitors cast member in 8 tries. 
            Each guess reveals clues about the answer.
            </p>

            <div className="howtoplay-rules">
            <div className="howtoplay-rule">
                <div className="howtoplay-cell correct">S1</div>
                <span>Exact match</span>
            </div>
            <div className="howtoplay-rule">
                <div className="howtoplay-cell close">S2 ↑</div>
                <span>Close — you're within range, arrow shows direction</span>
            </div>
            <div className="howtoplay-rule">
                <div className="howtoplay-cell wrong">S4</div>
                <span>No match</span>
            </div>
            </div>

            <div className="howtoplay-attributes">
            <p>Each guess compares:</p>
            <ul>
                <li>Name</li>
                <li>Traitor or Faithful</li>
                <li>Season number</li>
                <li>Country (US / UK)</li>
                <li>Placement</li>
                <li>Age</li>
            </ul>
            </div>

            <button className="modal-share" onClick={onClose}>Got it!</button>
        </div>
        </div>
    )
}