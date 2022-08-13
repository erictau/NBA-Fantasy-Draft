export default function DraftedPlayersList({participants, draftPicks}) {
    return (
        <div className="d-flex row align-items-center">
            <div className="container">
                {draftPicks.map((pick, idx) => {return <div className="text-start">{idx + 1}. {participants[idx % participants.length].name} - {pick.first_name} {pick.last_name} - {pick.projectedScore.toFixed(2)} pts</div>})}
            </div>
        </div>
    )
}