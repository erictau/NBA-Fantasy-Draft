import './DraftPage.css'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import * as draftsAPI from '../../utilities/drafts-api'
import * as playersAPI from '../../utilities/players-api'
import PlayerList from '../../components/PlayerList//PlayerList'
import PicksList from '../../components/PicksList//PicksList'
import playersThisSeason from '../../seed/playersThisSeason'


import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner';


export default function DraftPage() {
    // State
    const [draftData, setDraftData] = useState({name: '', draftPicks: []})
    const [remainingPlayersIds, setRemainingPlayersIds] = useState(playersThisSeason)
    const [remainingPlayers, setRemainingPlayers] = useState([])
    const [numPlayersRendered, setNumPlayersRendered] = useState(5)
    const [usersPlayersIds, setUsersPlayersIds] = useState([])
    const [usersPlayers, setUsersPlayers] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    // Params
    const { draftId } = useParams();

    // Use Effect 
    useEffect(function() {
        // Retrieves the draft object from the database.
        async function startup() {
            async function getCurrentDraft() {
                const draft = await draftsAPI.getDraftById(draftId)
                setDraftData(draft)
            } 
            await getCurrentDraft()
            
            // Sets the state variable 'remainingPlayersIds' based on all players minus players who've been drafted already. Saves Ids only. 
            function getRemainingPlayersIds() {
                let tempRemainingPlayersIds = [...remainingPlayersIds]
                draftData.draftPicks.forEach(pick => {
                    let index = tempRemainingPlayersIds.findIndex(remaining => remaining === pick.playerId)
                    tempRemainingPlayersIds.splice(index, 1)
                })
                setRemainingPlayersIds(tempRemainingPlayersIds)
            }
            await getRemainingPlayersIds()

            // Grabs the users players based on which players have been drafted.
            // This function currently is set up assuming a single user can participate in a draft. Must refactor to allow multiple users in the future.
            function getUsersPlayersIds() {
                let playersIdList = draftData.draftPicks.map(pick => pick.playerId)
                setUsersPlayersIds(playersIdList)
            }
            await getUsersPlayersIds()

            // Returns an array of players including stats and names. 
            async function fetchRemainingPlayers() {
                const tempRemainingPlayers = await playersAPI.getPlayersById(remainingPlayersIds.slice(0, numPlayersRendered))
                tempRemainingPlayers.forEach(player => { player.projectedScore = calculateProjectedScore(player) })
                setRemainingPlayers(tempRemainingPlayers)
            }
            await fetchRemainingPlayers()
            setIsLoading(false)
        }
        startup()
    }, [])

    // Helper Functions
    async function calculateProjectedScore(player) {
        console.log(await draftData.scoringSystem)
    }

    if (!isLoading) {
        return (
            <>
            <h1>Draft: {draftData.name}</h1>
            <div className="row">
                <div className="col-6">
                    <PicksList />
                    {draftData.draftPicks.join(', ')}
                </div>
                <div className="col-6">
                    <PlayerList remainingPlayers={remainingPlayers} />
                </div>
            </div>
        </>
    )
    } 
    else {
        // Returns a loading screen, which is just 3 blinking dots.
        return (
            <div className="loading d-flex justify-content-center align-items-center m-auto">
                <Spinner className="m-3" animation="grow" />
                <Spinner className="m-3" animation="grow" />
                <Spinner className="m-3" animation="grow" />
            </div>
        )
    }
}