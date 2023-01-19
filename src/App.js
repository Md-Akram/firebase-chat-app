import './App.css';
import { Auth } from './components/Auth';
import Cookies from 'universal-cookie';
import { useRef, useState } from 'react';
import { Chat } from './components/Chat';
import { signOut } from 'firebase/auth';
import { auth } from './firebase-config';

const cookies = new Cookies()

function App() {
  const [isAuth, setAuth] = useState(cookies.get('auth-token'))
  const [room, setRoom] = useState(null)
  const roomInfoRef = useRef(null)

  const signUserOut = async () => {
    await signOut(auth)
    cookies.remove('auth-token')
    setAuth(false)
    setRoom(null)
  }

  if (!isAuth) {
    return (
      <div className="App">
        Chat app
        <Auth setAuth={setAuth} />
      </div>
    );
  }

  return (
    <div>
      {room ?
        (<Chat room={room} />)
        :
        (<div>
          <label>Enter room name</label>
          <input ref={roomInfoRef} />
          <button onClick={() => setRoom(roomInfoRef.current.value)} >Enter</button>
        </div>)
      }
      <button onClick={signUserOut} >signout</button>
    </div>

  )
}

export default App;
