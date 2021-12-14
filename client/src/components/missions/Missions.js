import React, { Fragment, useContext, useEffect } from 'react';
import MissionContext from '../../context/mission/missionContext';
// import Spinner from '../layout/Spinner';
import { Link } from 'react-router-dom';
import { PlusCircle } from 'react-bootstrap-icons';

const Missions = () => {
  const context = useContext(MissionContext);
  const { loading, missions, getMissions } = context;
  
  <Link to={'/missions/new'}>Add New Mission</Link>
  
  useEffect(() => {    
    getMissions();
    // eslint-disable-next-line
  }, []);
  
  return (
    <Fragment>      
      <h2 className="missions_title">Missions</h2>
      <div className="missions_list">
        <div className="list_block">
          <Link to='/missions/new'><PlusCircle color="teal" size={30} /></Link>
        </div>
        {!loading && missions !== null && missions.map(mission => (
          <div className="list_block" key={mission._id}>
              <Link to={`/api/missions/${mission._id}`}>Mission #{mission.mission}</Link>
            </div>
            ))
          }
          {/* {loading && <Spinner />} */}
      </div>
    </Fragment>
  );

}

export default Missions;