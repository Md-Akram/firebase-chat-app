import './App.css';
import { Auth } from './components/Auth';
import Cookies from 'universal-cookie';
import { useRef, useState } from 'react';

const cookies = new Cookies()

function App() {
  const [isAuth, setAuth] = useState(cookies.get('auth-token'))
  const [room, setRoom] = useState(null)
  const roomInfoRef = useRef(null)

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
        (<div>Chat</div>)
        :
        (<div>
          <label>Enter room name</label>
          <input ref={roomInfoRef} />
          <button onClick={() => setRoom(roomInfoRef.current.value)} >Enter</button>
        </div>)
      }
    </div>

  )
}

export default App;
