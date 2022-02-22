import { Routes, Route } from 'react-router-dom'
import io from 'socket.io-client'

import { Menu } from './components/Menu';
import { CreateMatch } from './components/CreateMatch';
import { WaitingRoom } from './components/WaitingRoom';
import { Play } from './components/Play/Play';
import { JoinMatch } from './components/JoinMatch';

import './styles/App.scss';

function App() {
  const URL = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:3001/'
  const socket = io.connect(URL)

  return (
    <Routes>
      <Route path='/' element={<Menu />} />
      <Route path='/create-match' element={<CreateMatch socket={socket} />} />
      <Route path='/join-match' element={<JoinMatch socket={socket} />} />
      <Route path='/waiting-room' element={<WaitingRoom socket={socket}/>} />
      <Route path='/play' element={<Play socket={socket} />} />
    </Routes>
  );
}

export default App;
