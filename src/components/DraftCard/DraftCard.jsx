import Card from 'react-bootstrap/Card'
import { Link } from 'react-router-dom'

export default function DraftCard({ draft }) {
    return (
        <Link to={`/drafts/${draft._id}`} style={{textDecoration: 'none', color: 'black'}}>
            <Card>
                <Card.Title><h1>{draft.name}</h1></Card.Title>
                <Card.Body>
                    <Card.Text>
                        <div><b>Total Score: {draft.draftPicks.reduce((total, player) => total += player.projectedScore, 0).toFixed(2)}</b></div>
                        {draft.draftPicks.map(player => `${player.first_name} ${player.last_name}`).join(' | ')}
                    </Card.Text>
                    <Card.Text>
                        <div>Scoring System - {draft.scoringSystem.name}</div>
                        <div>
                            Pts: {draft.scoringSystem.pts} | 
                            Ast: {draft.scoringSystem.ast} |
                            Reb: {draft.scoringSystem.reb} |
                            Stl: {draft.scoringSystem.stl} |
                            Blk: {draft.scoringSystem.blk} |
                            TO: {draft.scoringSystem.turnover} |
                            PF: {draft.scoringSystem.pf}
                        </div>
                    </Card.Text>
                </Card.Body>
            </Card>
        </Link>
    )
}