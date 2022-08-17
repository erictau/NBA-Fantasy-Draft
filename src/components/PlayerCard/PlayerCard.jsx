import './PlayerCard.css'
import { useState, useEffect } from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'


export default function PlayerCard({ player, draftPlayer, draftComplete}) {

    function handleDraft() {
        draftPlayer(player)
    }

    return (
        <Card className="bg-primary text-white mt-2">
        <Card.Header className="bg-primary text-white">{player.first_name} {player.last_name} ({player.team})
            <div><b>Projected Score: {player.projectedScore.toFixed(2)}</b></div>
        </Card.Header>
        <Card.Body className="bg-light text-dark PlayerCard">
            <div>
                {!player.user && !draftComplete && <Button onClick={handleDraft} variant="primary">Draft</Button>}
            </div>
            <div className="row">
                <div className="col-6 d-flex flex-column">
                    <div>POS: {player.position}</div>
                    <div>PPG: {player.pts}</div>
                    <div>RPG: {player.reb}</div>
                    <div>APG: {player.ast}</div>
                </div>
                <div className="col-6 d-flex flex-column">
                    <div>SPG: {player.stl}</div>
                    <div>BPG: {player.blk}</div>
                    <div>FPG: {player.pf}</div>
                    <div>TOPG: {player.turnover}</div>
                </div>
            </div>
        </Card.Body>
    </Card>
    )   

}
