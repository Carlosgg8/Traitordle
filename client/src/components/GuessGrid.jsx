import React from "react";
import GuessRow from "./GuessRow";

export default function GuessGrid({ guesses }) {
    return (
        <div className="guess-grid">
        <div className="column-headers">
            <div className="column-header">Name</div>
            <div className="column-header">Traitor</div>
            <div className="column-header">Season</div>
            <div className="column-header">Country</div>
            <div className="column-header">Placement</div>
            <div className="column-header">Age</div>
        </div>

        {Array(8).fill(null).map((_, index) => {
            if (guesses[index]) {
            return (
                <GuessRow
                key={index}
                name={guesses[index].guess}
                comparison={guesses[index].comparison}
                />
            )
            } else {
            return (
                <div key={index} className="guess-row">
                    {Array(6).fill(null).map((_, i) => (
                        <div key={i} className="empty-cell" />
                    ))}
                </div>
            )
            }
        })}
        </div>
    )
}