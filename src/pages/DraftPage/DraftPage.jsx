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
    const [playerPage, setPlayerPage] = useState(1)
    const [usersPlayersIds, setUsersPlayersIds] = useState([])
    const [usersPlayers, setUsersPlayers] = useState([])

    // Params
    const { draftId } = useParams();

    // Use Effect 
    useEffect(function() {
        // Retrieves the draft object from the database.
        async function startup() {
            await getCurrentDraft()
            getRemainingPlayersIds()
            getUsersPlayersIds()
        }
        startup()
    }, [])

    useEffect(function() {
        async function run() {
            await fetchRemainingPlayers()
        }
        run()
    }, [draftData, playerPage])

    // Handler Functions


    // Helper Functions
    async function calculateProjectedScore(player) {
        let scoring = await draftData.scoringSystem
        let totalScore = 
        player.pts * scoring.pts +
        player.ast * scoring.ast + 
        player.reb * scoring.reb + 
        player.stl * scoring.stl +
        player.blk * scoring.blk + 
        player.turnover * scoring.to +
        player.pf * scoring.pf
        return totalScore
    }

    async function getCurrentDraft() {
        const draft = await draftsAPI.getDraftById(draftId)
        setDraftData(draft)
    } 

    // Sets the state variable 'remainingPlayersIds' based on all players minus players who've been drafted already. Saves Ids only. 
    function getRemainingPlayersIds() {
        let tempRemainingPlayersIds = [...remainingPlayersIds]
        draftData.draftPicks.forEach(pick => {
            let index = tempRemainingPlayersIds.findIndex(remaining => remaining === pick.playerId)
            tempRemainingPlayersIds.splice(index, 1)
        })
        setRemainingPlayersIds(tempRemainingPlayersIds)
    }

    // Grabs the users players based on which players have been drafted.
    // This function currently is set up assuming a single user can participate in a draft. Must refactor to allow multiple users in the future.
    function getUsersPlayersIds() {
        let playersIdList = draftData.draftPicks.map(pick => pick.playerId)
        setUsersPlayersIds(playersIdList)
    }

    // Returns an array of players including stats and names. 
    async function fetchRemainingPlayers() {
        let start = (playerPage - 1) * numPlayersRendered
        let end = start + numPlayersRendered
        const tempRemainingPlayers = await playersAPI.getPlayersById(remainingPlayersIds.slice(start, end))
        tempRemainingPlayers.forEach(async function(player) { player.projectedScore = await calculateProjectedScore(player) })
        setRemainingPlayers(tempRemainingPlayers)
    }


    // Render 
    return (
        <>
            <h1>Draft: {draftData.name}</h1>
            <div className="row">
                <div className="col-6">
                    <h1>Your Picks</h1>
                    <PicksList draftPicks={draftData.draftPicks}/>
                </div>
                <div className="col-6">
                    <h1>Available Players</h1>
                    <PlayerList remainingPlayers={remainingPlayers} playerPage={playerPage} setPlayerPage={setPlayerPage} />
                </div>
            </div>
        </>
    )
}