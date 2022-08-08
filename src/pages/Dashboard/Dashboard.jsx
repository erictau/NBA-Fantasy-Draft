import { useState, useEffect } from 'react'
// React Bootstrap
import Button from 'react-bootstrap/Button'
// Custom Components
import DraftList from '../../components/DraftList/DraftList'
// Utils
import * as playersAPI from '../../utilities/players-api'
import * as draftsAPI from '../../utilities/drafts-api'
import playersThisSeason from '../../seed/playersThisSeason'

export default function Dashboard() {
    // State
    const [drafts, setDrafts] = useState(null)
    
    // Use Effect
    useEffect(function() {
        async function getDrafts() {
            let results = await draftsAPI.getAllDrafts()
            console.log(results)
            setDrafts(results)
        }
        getDrafts()
    }, [])

    return (
        <>
            <Button>Create New Draft</Button>
            <div className="container">
                <DraftList drafts={drafts}/>
            </div>
        </>
    )
}