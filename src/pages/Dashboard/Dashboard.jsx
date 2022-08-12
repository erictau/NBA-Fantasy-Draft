import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
// React Bootstrap
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
// Custom Components
import DraftList from '../../components/DraftList/DraftList'
// Utils
import * as playersAPI from '../../utilities/players-api'
import * as draftsAPI from '../../utilities/drafts-api'
import playersThisSeason from '../../seed/playersThisSeason'

export default function Dashboard({ user }) {
    // State
    const [drafts, setDrafts] = useState(null)
    const [formData, setFormData] = useState({draftId: ''})
     
    // Use Effect
    useEffect(function() {
        async function getDrafts() {
            let results = await draftsAPI.getAllDrafts()
            setDrafts(results)
        }
        getDrafts()
    }, [])

    // Handler Functions
    function handleChange(evt) {
        let updatedForm = {...formData, [evt.target.name]: evt.target.value}
        setFormData(updatedForm)
    }

    function handleSubmit(evt) {
        evt.preventDefault()
        
    }

    return (
        <>
            <div className='container'>
                <Link to='/drafts/new' className="btn btn-primary">Create New Draft</Link>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Join Draft by ID</Form.Label>
                        <Form.Control type="text" name="draftId" value={formData.draftId} onChange={handleChange} placeholder="Enter Draft ID" />
                        <Button>Join Draft</Button>
                    </Form.Group>
                </Form>
            </div>
            <div className="container">
                <DraftList drafts={drafts} user={user}/>
            </div>
        </>
    )
}