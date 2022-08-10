import * as playersAPI from '../../utilities/players-api'
import PlayerCard from '../PlayerCard/PlayerCard'
import { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner';


export default function PlayerList({ remainingPlayers, playerPage, setPlayerPage }) {
    // State
    const [disabledBtn, setDisabledBtn] = useState(true)
    const [playersLoaded, setPlayersLoaded] = useState(false)
    
    // Use Effect
    useEffect(function() {
        setPlayersLoaded(false)
        if (playerPage === 1) {
            setDisabledBtn(true)
        } else {
            setDisabledBtn(false)
        }
        setTimeout(function() {
            setPlayersLoaded(true)
        }, 1000)
    }, [remainingPlayers, playerPage])


    // Handler Functions
    function handlePageBtn(evt) {
        if (evt.target.textContent === "Prev 5") {
            setPlayerPage(playerPage - 1)
        } else if (evt.target.textContent === "Next 5") {
            setPlayerPage(playerPage + 1)
        }
    }

    if (playersLoaded) {
        return (
            <div className="d-flex row align-items-center">
                {disabledBtn ? <div className='col-2'> </div> :<div className="col-2"><Button onClick={handlePageBtn}>Prev 5</Button></div>}
                <div className="container col-8">
                    <h6>Page {playerPage}</h6>
                    {remainingPlayers.map((player, idx) => <PlayerCard player={player} key={idx} />)}
                </div>
                <div className="col-2">
                    <Button onClick={handlePageBtn}>Next 5</Button>
                </div>
            </div>
        )
    } else {
        return (
            <div className="loading d-flex justify-content-center align-items-center m-auto">
                <Spinner className="m-3" animation="grow" />
                <Spinner className="m-3" animation="grow" />
                <Spinner className="m-3" animation="grow" />
            </div>
        )
    }
}