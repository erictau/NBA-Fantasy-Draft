import DraftCard from '../../components/DraftCard/DraftCard'

export default function DraftList({ drafts }) {
    return (
        <>
            { drafts && drafts.map((draft, idx) => <DraftCard draft={draft} key={idx}/>) }
        </>
    )
}