import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as draftsAPI from '../../utilities/drafts-api'

export default function DraftSetupPage() {
    // State
    const [draftForm, setDraftForm] = useState({
        name: '',
        scoringSystemName: '',
        numPlayersPerUser: null,
        pts: null,
        ast: null,
        reb: null,
        stl: null,
        blk: null,
        turnover: null,
        pf: null,
    })
    
    // Navigate
    const navigate = useNavigate()

    // Event Handlers
    function handleChange(evt) {
        let newDraftForm = {
            ...draftForm,
            [evt.target.name]: evt.target.value
        }
        setDraftForm(newDraftForm)
    }

    async function handleSubmit(evt) {
        evt.preventDefault()
        // Send API request
        const newDraft = await draftsAPI.createDraft(draftForm)
        // Navigate to the draft page. Need newly created draft's id
        navigate(`/drafts/${newDraft.id}`)
    }

    return (
        <>
            <Form autoComplete="off" onSubmit={handleSubmit}>
                <Form.Label>Draft Name</Form.Label>
                <Form.Control type='text' name='name' value={draftForm.name} onChange={handleChange} required/>
                <Form.Label>Scoring System Name</Form.Label>
                <Form.Control type='text' name='scoringSystemName' value={draftForm.scoringSystemName} onChange={handleChange} />
                <Form.Label>Number of Players Per User</Form.Label>
                <Form.Control type='number' name='numPlayersPerUser' value={draftForm.numPlayersPerUser} onChange={handleChange} />
                <Form.Label>Scoring System - Pts</Form.Label>
                <Form.Control type='number' name='pts' value={draftForm.pts} onChange={handleChange} />
                <Form.Label>Scoring System - Ast</Form.Label>
                <Form.Control type='number' name='ast' value={draftForm.ast} onChange={handleChange} />
                <Form.Label>Scoring System - Reb</Form.Label>
                <Form.Control type='number' name='reb' value={draftForm.reb} onChange={handleChange} />
                <Form.Label>Scoring System - Stl</Form.Label>
                <Form.Control type='number' name='stl' value={draftForm.stl} onChange={handleChange} />
                <Form.Label>Scoring System - Blk</Form.Label>
                <Form.Control type='number' name='blk' value={draftForm.blk} onChange={handleChange} />
                <Form.Label>Scoring System - TO</Form.Label>
                <Form.Control type='number' name='turnover' value={draftForm.to} onChange={handleChange} />
                <Form.Label>Scoring System - Fouls</Form.Label>
                <Form.Control type='number' name='pf' value={draftForm.pf} onChange={handleChange} />

                <Button type="submit">Submit</Button>
            </Form>
        </>
    )
}