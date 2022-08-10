import * as playersAPI from '../../utilities/players-api'
import PlayerCard from '../PlayerCard/PlayerCard'
import { useState } from 'react'

export default function PlayerList({ remainingPlayers }) {


    return (
        <div className="container">
            <h1>Available Players</h1>
            {remainingPlayers.map((player, idx) => <PlayerCard player={player} key={idx} />)}
        </div>
    )
}