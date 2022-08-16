import Table from 'react-bootstrap/Table';


export default function DraftedPlayersList({participants, draftPicks}) {
    return (
        <Table striped bordered hover size="lg" className="text-center table-primary">
            <thead>
                <tr>
                    <th>#</th>
                    <th>User</th>
                    <th>Player</th>
                    <th>Projected</th>
                </tr>
            </thead>
            <tbody>
                {draftPicks.map((pick, idx) => {
                    return (
                        <tr key={idx}>
                            <td>{idx + 1}</td>
                            <td>{participants[idx % participants.length].name}</td>
                            <td>{`${pick.first_name} ${pick.last_name}`}</td>
                            <td>{pick.projectedScore.toFixed(2)} pts</td>
                        </tr>
                    )
                })}
            </tbody>
        </Table>
    )
}