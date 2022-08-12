import DraftCard from '../../components/DraftCard/DraftCard'

export default function DraftList({ drafts, user }) {
    return (
        <>
            <h1>Your Drafts</h1>
            { drafts && drafts.map((draft, idx) => <DraftCard draft={draft} user={user} key={idx}/>) }
        </>
    )
}