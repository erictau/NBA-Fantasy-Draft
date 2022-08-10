import * as playersAPI from '../../utilities/players-api'
import PlayerCard from '../PlayerCard/PlayerCard'
import { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'

export default function PlayerList({ remainingPlayers, playerPage }) {
    // State
    const [disabledBtn, setDisabledBtn] = useState(false)
    
    // Use Effect
    useEffect(function() {
        if (playerPage === 1) {
            setDisabledBtn(true)
        } 
    }, [playerPage])

    return (
        <>
            <div className="d-flex row align-items-center">
            {disabledBtn ? <div className='col-2'> </div> :<div className="col-2"><Button>Prev 5</Button></div>}
            <div className="container col-8">
                <h1>Available Players</h1>
                <h6>Page {playerPage}</h6>
                {remainingPlayers.map((player, idx) => <PlayerCard player={player} key={idx} />)}
            </div>
            <div className="col-2"><Button>Next 5</Button></div>
            </div>
        </>
    )
}