import React from "react";
import GuessRow from "./GuessRow";

export default function GuessGrid({ guesses }) {
    return (
        <div className="guess-grid">
        {Array(8).fill(null).map((_, index) => {
            if (guesses[index]) {
            return (
                <GuessRow
                    key={index}
                    name={guesses[index].guess}
                    comparison={guesses[index].comparison}
                />
            );
            } else {
            return (
                <div key={index} className="empty-guess-row" style={{ display: 'grid', gridTemplateColumns: 'repeat(8, 1fr)', gap: '5px' }}>
                {Array(6).fill(null).map((_, i) => (
                    <div key={i} style={{ backgroundColor: '#e5e7eb', width: '90px', height: '60px', borderRadius: '6px' }} />
                ))}
                </div>
            );
            }
        })}
        </div>
    );
}