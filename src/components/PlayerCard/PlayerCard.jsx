import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

export default function PlayerCard({ player }) {
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
}
