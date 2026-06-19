import React from 'react'

export default function GuessRow({ name, comparison }) {
    const getColor = (result) => {
        if (result === 'neutral') return '#3a3a3a'
        if (result === 'correct') return '#16a34a'
        if (result === 'close') return '#ca8a04'
        return '#3a3a3a'
    }

    const getDirection = (direction) => {
        if (direction === 'higher') return ' ↑'
        if (direction === 'lower') return ' ↓'
        return ''
    }

    const cells = [
        { label: 'Name', value: name, result: 'nuetral' },
        { label: 'Traitor', value: comparison.isTraitor.value ? 'Yes' : 'No', result: comparison.isTraitor.result },
        { label: 'Season', value: comparison.season.value, result: comparison.season.result },
        { label: 'Country', value: comparison.country.value.toUpperCase(), result: comparison.country.result },
        { label: 'Placement', value: comparison.placement.value + getDirection(comparison.placement.direction), result: comparison.placement.result },
        { label: 'Age', value: comparison.age.value + getDirection(comparison.age.direction), result: comparison.age.result },
    ]

    return (
        <div className="guess-row">
            {cells.map((cell, index) => (
            <div
                key={cell.label}
                className="guess-cell"
                style={{
                background: getColor(cell.result),
                animationDelay: `${index * 80}ms`,
                }}
            >
                <div className="guess-cell-label">{cell.label}</div>
                <div className="guess-cell-value">{cell.value}</div>
            </div>
            ))}
        </div>
    )
}