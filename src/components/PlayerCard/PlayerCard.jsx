import { useState, useEffect } from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner';


export default function PlayerCard({ player }) {
    const [playersLoaded, setPlayersLoaded] = useState(false)

    useEffect(function() {
        setTimeout(function() {
            setPlayersLoaded(true)
        }, 1000)
    }, [player.first_name])
    
    if (playersLoaded) {
        return (
            <Card>
            <Card.Title>{player.first_name} {player.last_name} ({player.team})</Card.Title>
            <Card.Body>
                <div className="row">

                <Card.Text className="col-6">
                    PPG: {player.pts}, RPG: {player.reb}, APG: {player.ast}, SPG: {player.stl}, BPG: {player.blk}, FPG: {player.pf}, TOPG: {player.turnover}
                </Card.Text>
                <Card.Text className="col-6">
                    <b>Projected Score: </b>
                </Card.Text>
                </div>
                <Button variant="primary">Select</Button>
            </Card.Body>
        </Card>
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
