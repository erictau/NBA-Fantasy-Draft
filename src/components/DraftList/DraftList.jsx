import DraftCard from '../../components/DraftCard/DraftCard'

export default function DraftList({ drafts, user }) {
    return (
        <>
            <h4>Your Drafts</h4>
            <div className="d-flex flex-wrap">
                { drafts && drafts.map((draft, idx) => <DraftCard draft={draft} user={user} key={idx}/>) }
            </div>
        </>
    )
}