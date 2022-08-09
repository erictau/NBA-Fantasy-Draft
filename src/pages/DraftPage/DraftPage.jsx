import { useState, useEffect } from 'react'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'


export default function DraftPage() {
    // State
    const [draftData, setDraftData] = useState(null)


    // Use Effect
    useEffect(function() {
        async function getDraftById() {

        }    
    }, [])

    return (
        <>
            <Form> 
                <h1>Test</h1>
            </Form>
        </>
    )
}