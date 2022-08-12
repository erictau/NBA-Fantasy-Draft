import './DraftPage.css'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import * as draftsAPI from '../../utilities/drafts-api'
import * as playersAPI from '../../utilities/players-api'
import PlayerList from '../../components/PlayerList//PlayerList'
import PicksList from '../../components/PicksList//PicksList'
import playersThisSeason from '../../seed/playersThisSeason'

// Constants
let PROPERTIES = ['pts', 'ast', 'reb', 'stl', 'blk', 'turnover', 'pf']

export default function DraftPage() {
    // State
    const [draftData, setDraftData] = useState({name: '', draftPicks: []})
    const [remainingPlayersIds, setRemainingPlayersIds] = useState(null)
    const [remainingPlayers, setRemainingPlayers] = useState([])
    const [numPlayersRendered, setNumPlayersRendered] = useState(5)
    const [playerPage, setPlayerPage] = useState(1)
    const [draftComplete, setDraftComplete] = useState(false)

    // Params
    const { draftId } = useParams();

    // Use Effect 
    useEffect(function() {
        // Retrieves the draft object from the database.
        async function startup() {
            await getCurrentDraft()
        }
        startup()
    }, [])

    useEffect(function() {
        async function run() {
            getRemainingPlayersIds()
        }
        run()
    }, [draftData, playerPage])
    
    useEffect(function() {
        async function run() {            
            await fetchRemainingPlayers()
        }
        run()
    }, [remainingPlayersIds])

    useEffect(function() {
        checkDraftCompletion()
    }, [draftData])

    // Helper Functions
    function checkDraftCompletion() {
        if (draftData.draftPicks.length >= draftData.numPlayersPerUser) {
            setDraftComplete(true)
        }
    }

    async function draftPlayer(player) {
        let draftedPlayer = {}
        draftedPlayer.playerId = player.player_id
        PROPERTIES.forEach(property => {
            draftedPlayer[property] = player[property]
        })
        draftedPlayer.first_name = player.first_name
        draftedPlayer.last_name = player.last_name
        draftedPlayer.position = player.position
        draftedPlayer.team = player.team
        draftedPlayer.projectedScore = player.projectedScore
        draftedPlayer.user = draftData.participants
        setDraftData(await draftsAPI.draftPlayer(draftId, draftedPlayer))
    }

    async function calculateProjectedScore(player) {
        let scoring = await draftData.scoringSystem
        let totalScore = 0
        PROPERTIES.forEach(property => {
            totalScore += player[property] * scoring[property]
        })
        
        return totalScore
    }

    async function getCurrentDraft() {
        const draft = await draftsAPI.getDraftById(draftId)
        setDraftData(draft)
    } 

    // Needs work.  
    // Sets the state variable 'remainingPlayersIds' based on all players minus players who've been drafted already. Saves Ids only. 
    function getRemainingPlayersIds() {
        let tempRemainingPlayersIds = remainingPlayersIds ? [...remainingPlayersIds] : [...playersThisSeason]
        draftData.draftPicks.forEach(pick => {
            let index = tempRemainingPlayersIds.findIndex(remaining => remaining === pick.playerId)
            if (index !== -1) {
                tempRemainingPlayersIds.splice(index, 1)
            }
        })
        setRemainingPlayersIds(tempRemainingPlayersIds)
    }


    // Returns an array of players including stats and names. This array is sorted by playerId automatically by the 3rd party API. Will return players out of order.
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
                    <PicksList draftPicks={draftData.draftPicks} numPlayersPerUser={draftData.numPlayersPerUser}/>
                </div>
                <div className="col-6">
                    <h1>Available Players</h1>
                    <PlayerList remainingPlayers={remainingPlayers} playerPage={playerPage} setPlayerPage={setPlayerPage} draftPlayer={draftPlayer} draftComplete={draftComplete}/>
                </div>
            </div>
        </>
    )
}