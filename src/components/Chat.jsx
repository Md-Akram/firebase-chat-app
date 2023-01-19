import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp, where } from "firebase/firestore"
import { useEffect, useState } from "react"
import { auth, db } from "../firebase-config"

export const Chat = (props) => {
    const { room } = props
    const [newMessage, setNewMessage] = useState('')
    const [messages, setMessages] = useState([])

    const messageRef = collection(db, 'messages')

    useEffect(() => {
        const queryMessage = query(messageRef, where('room', '==', room), orderBy("createdAt"))
        const unsubscribe = onSnapshot(queryMessage, (snapshot) => {
            let messages = []
            snapshot.forEach((doc) => {
                messages.push({ ...doc.data(), id: doc.id })
            })
            setMessages(messages)
        })
        return () => unsubscribe()
    }, [])

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
            <div className="header">
                <h1>Welcome to : {room.toUpperCase()}</h1>
            </div>
            <div className="messages">
                {messages.map((message) => {
                    return (
                        <div className="message" key={message.id}>
                            <span className="user">{message.user} </span>
                            {message.text}
                        </div>
                    )
                })}
            </div>
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