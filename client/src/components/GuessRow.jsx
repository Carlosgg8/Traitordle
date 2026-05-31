import React from 'react'

export default function GuessRow({ name, comparison }) {
    const getColor = (result) => {
        if (result === 'correct') return '#16a34a'
        if (result === 'close') return '#ca8a04'
        return '#dc2626'
    }

    const getDirection = (direction) => {
        if (direction === 'higher') return ' ↑'
        if (direction === 'lower') return ' ↓'
        return ''
    }

    const cells = [
        { label: 'Name', value: name, result: 'correct' },
        { label: 'Traitor', value: comparison.isTraitor.value ? 'Yes' : 'No', result: comparison.isTraitor.result },
        { label: 'Season', value: comparison.season.value, result: comparison.season.result },
        { label: 'Country', value: comparison.country.value.toUpperCase(), result: comparison.country.result },
        { label: 'Placement', value: comparison.placement.value + getDirection(comparison.placement.direction), result: comparison.placement.result },
        { label: 'Age', value: comparison.age.value + getDirection(comparison.age.direction), result: comparison.age.result },
    ]

    return (
        <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
        {cells.map((cell) => (
            <div
            key={cell.label}
            style={{
                background: getColor(cell.result),
                color: 'white',
                padding: '12px 8px',
                borderRadius: '6px',
                width: '90px',
                textAlign: 'center',
                fontSize: '13px',
                fontWeight: '500'
            }}
            >
            <div style={{ fontSize: '10px', opacity: 0.8, marginBottom: '4px' }}>{cell.label}</div>
            <div>{cell.value}</div>
            </div>
        ))}
        </div>
    )
}