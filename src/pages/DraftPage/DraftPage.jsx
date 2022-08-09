import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import * as draftsAPI from '../../utilities/drafts-api'
import PlayerList from '../../components/PlayerList//PlayerList'
import PicksList from '../../components/PicksList//PicksList'


import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'


export default function DraftPage() {
    // State
    const [draftData, setDraftData] = useState({})

    // Params
    const { draftId } = useParams();

    // Use Effect
    useEffect(function() {
        async function getCurrentDraft() {
            const draft = await draftsAPI.getDraftById(draftId)
            setDraftData(draft)
        } 
        getCurrentDraft()   
    }, [])

    return (
        <>
            <h1>Draft: {draftData.name}</h1>
            <div className="row">
                <div className="col-6">
                    <PicksList />
                </div>
                <div className="col-6">
                    <PlayerList />
                </div>
            </div>
        </>
    )
}