import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
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
    const [formData, setFormData] = useState({draftId: '', userId: user._id})
     
    // Use Effect
    useEffect(function() {
        async function getDrafts() {
            let results = await draftsAPI.getAllDrafts()
            setDrafts(results)
        }
        getDrafts()
    }, [])

    // Navigate
    const navigate = useNavigate()

    // Handler Functions
    function handleChange(evt) {
        let updatedForm = {...formData, [evt.target.name]: evt.target.value}
        setFormData(updatedForm)
    }

    async function handleSubmit(evt) {
        evt.preventDefault()
        const draft = await draftsAPI.joinDraft(formData)
        navigate(`/drafts/${formData.draftId}`)
    }

    return (
        <>
            <div className='container'>
                <h4>Add A Draft</h4>
                <Link to='/drafts/new' className="btn btn-primary mb-2">Create New Draft</Link>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3 w-50 mx-auto">
                        <Form.Label>Join Draft by ID</Form.Label>
                        <Form.Control type="text" name="draftId" value={formData.draftId} onChange={handleChange} placeholder="Enter Draft ID" />
                        <Button variant="primary" className="m-2" type="submit">Join Draft</Button>
                    </Form.Group>
                </Form>
            </div>
            <div className="container">
                <DraftList drafts={drafts} user={user}/>
            </div>
        </>
    )
}