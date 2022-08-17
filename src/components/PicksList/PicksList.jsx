import { useState, useEffect } from 'react';

import PlayerCard from '../PlayerCard/PlayerCard'
import Card from 'react-bootstrap/Card'


export default function PicksList({ user, draftPicks, numOfPlayersPerUser }) {
    // State
    const [positions, setPositions] = useState({'G': 0, 'F': 0, 'C': 0})
    
    // Effects
    useEffect(function() {
        let tempPositions = {'G': 0, 'F': 0, 'C': 0}
        draftPicks.filter(pick => pick.user === user._id).forEach(player => {
            player.position.split('-').forEach(pos => {
                tempPositions[pos] += 1
            })
        })
        setPositions(tempPositions)
    } ,[draftPicks])

    return (
        <div className="d-flex row align-items-center">
            <div className="container">
                <Card className="bg-light text-dark">
                    <Card.Title className="m-0">
                        Total Score: {draftPicks.filter(pick => pick.user === user._id).reduce((total, player) => total += player.projectedScore, 0).toFixed(2)}
                    </Card.Title>
                    <Card.Body className="p-0">
                        <div>
                            Positions: G-{positions.G}, F-{positions.F}, C-{positions.C}
                        </div>
                    </Card.Body>

                </Card>
                {draftPicks.filter(player => player.user === user._id).map((filteredPlayer, idx) => <PlayerCard player={filteredPlayer} key={idx} />)}
            </div>
        </div>
    )
}