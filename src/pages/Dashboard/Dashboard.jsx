import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
// React Bootstrap
import Button from 'react-bootstrap/Button'
// Custom Components
import DraftList from '../../components/DraftList/DraftList'
// Utils
import * as playersAPI from '../../utilities/players-api'
import * as draftsAPI from '../../utilities/drafts-api'
import playersThisSeason from '../../seed/playersThisSeason'

export default function Dashboard({ user }) {
    // State
    const [drafts, setDrafts] = useState(null)
    
    // Use Effect
    useEffect(function() {
        async function getDrafts() {
            let results = await draftsAPI.getAllDrafts()
            setDrafts(results)
        }
        getDrafts()
    }, [])

    return (
        <>
            <Link to='/drafts/new' className="btn btn-primary">Create New Draft</Link>
            <div className="container">
                <DraftList drafts={drafts} user={user}/>
            </div>
        </>
    )
}