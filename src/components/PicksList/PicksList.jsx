import PlayerCard from '../PlayerCard/PlayerCard'
export default function PicksList({ draftPicks }) {


    return (
        <div className="d-flex row align-items-center">
            <div className="container col-8">
                {draftPicks.map(player => <PlayerCard player={player} />)}
            </div>
        </div>
    )
}