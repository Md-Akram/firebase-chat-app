import { addDoc, collection, serverTimestamp } from "firebase/firestore"
import { useState } from "react"
import { auth, db } from "../firebase-config"

export const Chat = (props) => {
    const { room } = props
    const [newMessage, setNewMessage] = useState('')

    const messageRef = collection(db, 'messages')

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (newMessage === '') return
        await addDoc(messageRef, {
            text: newMessage,
            createdAt: serverTimestamp(),
            user: auth.currentUser.displayName,
            room
        })
        setNewMessage('')
    }

    return (
        <div className="chat-app">
            <form onSubmit={handleSubmit} className="new-message-form">
                <input
                    type="text"
                    className="new-message-input"
                    placeholder="Type your message here"
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                />
                <button type="submit" className="send-button">
                    Send
                </button>
            </form>
        </div>
    )
}