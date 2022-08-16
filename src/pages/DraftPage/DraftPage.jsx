import './DraftPage.css'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import * as draftsAPI from '../../utilities/drafts-api'
import * as playersAPI from '../../utilities/players-api'
import PlayerList from '../../components/PlayerList//PlayerList'
import PicksList from '../../components/PicksList//PicksList'
import playersThisSeason from '../../seed/playersThisSeason'
import DraftedPlayersList from '../../components/DraftedPlayersList/DraftedPlayersList'
import socket from '../../utilities/socket'
import Offcanvas from 'react-bootstrap/Offcanvas'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'

// Constants
let PROPERTIES = ['pts', 'ast', 'reb', 'stl', 'blk', 'turnover', 'pf']

export default function DraftPage({ user }) {
    // State
    const [draftData, setDraftData] = useState({
        name: '', 
        draftPicks: [],
        participants: [], 
        scoringSystem: {},
        numPlayersPerUser: 0
    })
    const [remainingPlayersIds, setRemainingPlayersIds] = useState(null)
    const [remainingPlayers, setRemainingPlayers] = useState([])
    const [numPlayersRendered, setNumPlayersRendered] = useState(5)
    const [playerPage, setPlayerPage] = useState(1)
    const [draftComplete, setDraftComplete] = useState(false)
    const [participantIdx, setParticipantIdx] = useState(0)
    const [memoizedPlayers, setMemoizedPlayers] = useState({})
    const [showOffCanvas, setShowOffCanvas] = useState(false);
  

    // Params
    const { draftId } = useParams();

    // Use Effect 
    useEffect(function() {
        // Retrieves the draft object from the database.
        async function startup() {
            await getCurrentDraft()
        }
        socket.emit('joined-draft', draftId)
        startup()
    }, [])

    useEffect(function() {
        async function run() {
            getRemainingPlayersIds()
            if (draftData.participants.length) {
                updateParticipantsIdx()
            }
        }
        run()
    }, [draftData, playerPage])
    
    useEffect(function() {
        async function run() {    
            if (remainingPlayersIds) {
                await fetchRemainingPlayers()
            }        
        }
        run()
    }, [remainingPlayersIds])

    useEffect(function() {
        if (draftData.draftPicks.length) {
            checkDraftCompletion()
        }
    }, [draftData])

    // Socket Message Listeners
    // When a user drafts a player, all other clients will receive the updated draft data
    socket.on('update-draft', function(data) {
        setDraftData(data)
    })
    
    
    // OffCanvas Handler Functions
    const handleClose = () => setShowOffCanvas(false);
    const handleShow = () => setShowOffCanvas(true);
    
    // Helper Functions

    function updateParticipantsIdx() {
        setParticipantIdx(draftData.draftPicks.length % draftData.participants.length)
    }

    function checkDraftCompletion() {
        if (draftData.draftPicks.length >= draftData.numPlayersPerUser * draftData.participants.length) {
            setDraftComplete(true)
        }
    }

    async function draftPlayer(player) {
        if (user._id === draftData.participants[participantIdx]._id) {
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
            draftedPlayer.user = draftData.participants[participantIdx]._id
            let updatedDraftData = await draftsAPI.draftPlayer(draftId, draftedPlayer)
            setDraftData(updatedDraftData)
            socket.emit('draft-player', updatedDraftData)
            }
    }

    function calculateProjectedScore(player) {
        let scoring = draftData.scoringSystem
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
        let playerIdList = remainingPlayersIds.slice(start, end)
        let tempRemainingPlayers = []
        let tempMemoizedPlayers = {}

        // Utilize memoization to minimize API calls.
        playerIdList.forEach(async (id) => {
            if (memoizedPlayers[id]) {
                tempRemainingPlayers.push(memoizedPlayers[id])
            } else {
                let player = await playersAPI.getOnePlayerById(id)
                player.projectedScore = calculateProjectedScore(player)
                tempRemainingPlayers.push(player)
                tempMemoizedPlayers[player.player_id] = player
            }
        })
        Object.assign(tempMemoizedPlayers, memoizedPlayers)
        setMemoizedPlayers(tempMemoizedPlayers)
        setRemainingPlayers(tempRemainingPlayers)
    }

    // Render 

    return (
        <div className="container">
            <div>
                <h4>Draft: {draftData.name}</h4>        
                {!draftComplete ? draftData.participants.length && <h6>Player {draftData.participants[participantIdx].name} is Up</h6> : <h6>Draft is Complete!</h6>}
                {draftData.participants.length && <h4>Draft Order: {draftData.participants.map((participant, idx) => `${idx + 1}. ${participant.name}`).join(', ')}</h4>}
            </div>
            <div className="row">
                <Button variant="primary" className="d-lg-none" onClick={handleShow}>
                    Show All Drafted Players
                </Button>

                <div className="col-lg-4">
                    <Offcanvas show={showOffCanvas} onHide={handleClose} responsive="lg" scroll="true" backdrop="false">
                        <Offcanvas.Header closeButton>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                        <p className="mb-0">
                            <div>
                                <h5>Drafted Players</h5>
                                <DraftedPlayersList draftPicks={draftData.draftPicks} participants={draftData.participants}/>
                            </div>
                        </p>
                        </Offcanvas.Body>
                    </Offcanvas>
                </div>


                <div className="col-lg-4 col-md-6">
                    <h5>Your Picks</h5>
                    <PicksList user={user} draftPicks={draftData.draftPicks} numPlayersPerUser={draftData.numPlayersPerUser}/>
                </div>
                <div className="col-lg-4 col-md-6">
                    <h5>Available Players</h5>
                    <PlayerList remainingPlayers={remainingPlayers} playerPage={playerPage} setPlayerPage={setPlayerPage} draftPlayer={draftPlayer} draftComplete={draftComplete} />
                </div>
            </div>
        </div>
    )
}