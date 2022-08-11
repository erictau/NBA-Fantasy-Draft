import { useState, useEffect } from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'


export default function PlayerCard({ player, draftPlayer }) {

    function handleDraft() {
        draftPlayer(player)
    }

    return (
        <Card>
        <Card.Title>{player.first_name} {player.last_name} ({player.team})</Card.Title>
        <Card.Body>
            <div className="row">
            <Card.Text className="col-3 d-flex flex-column">
                <div>POS: {player.position}</div>
                <div>PPG: {player.pts}</div>
                <div>RPG: {player.reb}</div>
                <div>APG: {player.ast}</div>
            </Card.Text>
            <Card.Text className="col-3 d-flex flex-column">
                <div>SPG: {player.stl}</div>
                <div>BPG: {player.blk}</div>
                <div>FPG: {player.pf}</div>
                <div>TOPG: {player.turnover}</div>
            </Card.Text>
            <div className="col-6 p-3 d-flex flex-column">
                <b>Projected Score: {player.projectedScore.toFixed(2)}</b>
                <div>
                    { !player.user && <Button onClick={handleDraft} variant="primary">Draft</Button>}
                </div>
            </div>
            </div>
        </Card.Body>
    </Card>
    )   

}
