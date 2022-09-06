import "./ChatBox.css"
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import * as draftsAPI from '../../utilities/drafts-api'

export default function ChatBox({ chat }) {
    // State
    const [chatInput, setChatInput] = useState('')
    const [chatState, setChatState] = useState(chat)

    // Params
    const { draftId } = useParams();

    // Handler Functions
    function handleChatChanges(evt) {
        setChatInput(evt.target.value)
    }

    async function handleSubmit(evt) {
        evt.preventDefault()
        let newChat = await draftsAPI.postChatMessage(draftId, chatInput)
        setChatState(newChat)
        setChatInput('')
    }

    if (chat) {

        return (
            <div className="ChatBox">

            <div className="messages">
                {chatState && chatState.length > 1 && chatState.map(msg => {
                    return (
                        <div>
                            {msg.user}: {msg.message}
                        </div>
                    )
                })}
            </div>
            <div className="ChatBoxInput">
                <form onSubmit={handleSubmit}>
                    <input type="text" value={chatInput} onChange={handleChatChanges} placeholder="Talk your smack here..."/>
                    <span><button>Send</button></span>
                </form>
            </div>

        </div>
        
        )
    }
}