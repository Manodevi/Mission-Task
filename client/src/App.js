import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Missions from './components/missions/Missions';
import Mission from './components/missions/Mission';
import MissionForm from './components/missions/MissionForm';
import MissionState from './context/mission/MissionState';
import Alert from './components/layout/Alert';
import Back from './components/layout/Back';

function App() {
  return (
    <MissionState>
      <Router>
        <div className="container">
          <div className="main_container">
            <Back />
            <Alert />
            <Routes>
              <Route exact path='/' element={<Missions />} />           
              <Route exact path='/api/missions/:id' element={<Mission />} />           
              <Route exact path='/missions/new' element={<MissionForm />} />           
            </Routes>
          </div>
        </div>        
      </Router>
    </MissionState>
  );
}

export default App;
