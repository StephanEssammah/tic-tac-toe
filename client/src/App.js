import './App.scss';
import './temporary-styling.scss'
import { Routes, Route } from 'react-router-dom'
import { Menu } from './components/Menu';
import { CreateMatch } from './components/CreateMatch';
import { WaitingRoom } from './components/WaitingRoom';
import { Play } from './components/Play';
import { JoinMatch } from './components/JoinMatch';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Menu />} />
      <Route path='/create-match' element={<CreateMatch />} />
      <Route path='/join-match' element={<JoinMatch />} />
      <Route path='/waiting-room' element={<WaitingRoom />} />
      <Route path='/play' element={<Play/>} />
    </Routes>
  );
}

export default App;
