import React, { useContext, Fragment, useEffect } from 'react';
import { useParams} from 'react-router-dom';
import MissionContext from '../../context/mission/missionContext';
import MissionForm from './MissionForm';

const Mission = props => {
  const context = useContext(MissionContext);
  const { getMission, tasks, getTasks, clearMission } = context;

  const { id } = useParams();

  useEffect(() => {
    getMission(id);
    if(tasks.length === 0) {
      getTasks();
    }
    
    return () => {
      clearMission();
    };
    // eslint-disable-next-line
  }, [id]);

  return (
    <Fragment>
      <div>
        <MissionForm  />        
      </div>
    </Fragment>
  );
};

export default Mission;