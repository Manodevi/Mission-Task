import React, { Fragment, useContext, useEffect, useState } from 'react';
// import Spinner from '../layout/Spinner';
import MissionContext from '../../context/mission/missionContext';
import { useNavigate } from 'react-router-dom';
import { PencilSquare, Trash, Check2, X } from 'react-bootstrap-icons';

const MissionForm = (props) => {
  let navigate = useNavigate();
  const context = useContext(MissionContext);
  const { tasks, getTasks, addMission, updateMission, mission, deleteMission } = context;

  const [ yesTasksState, setYesTasksState ] = useState([]);
  const [ noTasksState, setNoTasksState ] = useState([]);  
  const [ edit, setEdit ] = useState(1);
  const [ tab, setTab ] = useState('checklist');

  useEffect(() => {
    if(tasks.length === 0) {
      getTasks();
    }    
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if(mission != null) {
      setYesTasksState(mission.yesTasks);
      setNoTasksState(mission.noTasks);      
      setEdit(0);
    }
    
    return () => {      
      setYesTasksState([]);
      setNoTasksState([]);      
    };
  }, [mission]);

  const addTasks = (event) => {    
    if(Number(event.target.value) === 1) {
      if (!yesTasksState.includes(event.target.name)) {
        setYesTasksState((state) => {
          return [...state, event.target.name];
        });
      } 

      if (noTasksState.includes(event.target.name)) {
        setNoTasksState((state) => state.filter(task => event.target.name !== task));
      }
    } else {
      if (!noTasksState.includes(event.target.name)) {
        setNoTasksState((state) => [...state, event.target.name]);
      } 

      if (yesTasksState.includes(event.target.name)) {
        setYesTasksState((state) => state.filter(task => event.target.name !== task));
      }
    }
  };

  const editForm = event => {
    event.preventDefault();
    setEdit(1);
  };
  
  const submitMission = event => {
    event.preventDefault();    
    const missionDetails = { yesTasks: yesTasksState, noTasks: noTasksState };
    if(mission !== null) {
      missionDetails.id = mission.id;
      updateMission(missionDetails);
      setEdit(0);
      return;
    }
    
    addMission(missionDetails);
    navigate('/');
  };

  const DeleteMission = (event) => {
    event.preventDefault();
    deleteMission(mission.id);
    navigate('/');
  };

  const checklistTab = (event) => {
    event.preventDefault();
    setTab('checklist');
  };

  const inspectionTab = (event) => {
    event.preventDefault();
    setTab('inspection');
  };

  // if(loading)
  //   return <Spinner />;

  return (
    <Fragment>
      <h2 className="missions_title">{mission ? `Mission #${mission.mission}` : 'New Mission'}</h2>      
      {mission !== null && (
        <Fragment>
          <div className="items_right">
            <button className="missionBtn missionBtn-icon" onClick={DeleteMission}>
              <Trash color="teal" size={20} />
            </button>
            {(edit === 0 && tab === 'checklist') && (
              <button className="missionBtn missionBtn-icon" onClick={editForm}>
                <PencilSquare color="teal" size={20} />
              </button>
            )}
          </div>
          <div className="mission_tabs">
            <button onClick={checklistTab} className={tab === 'checklist' ? "mission_tab tab_active" : 'mission_tab'}>
              Operator Checklist
            </button>
            <button onClick={inspectionTab} className={tab === 'inspection' ? "mission_tab tab_active" : 'mission_tab'}>
              Inspection Pictures
            </button>
            <div className="empty_tab"></div>
          </div>
        </Fragment>
      )}      

      {tab === 'checklist' && (
        <form onSubmit={submitMission}>
            <table className="table">
              <thead>
                <tr>
                  <th style={{width: "1rem", paddingRight: "0"}}>#</th>
                  <th style={{width: "70%", textAlign: "center"}}>Task</th>
                  <th>Yes</th>
                  <th>No</th>          
                </tr>
              </thead>
              <tbody>        
                  {tasks.map((task, index) => (
                    <tr key={task._id}>
                      <td>{++index}</td>                    
                      {(yesTasksState.includes(task._id) || 
                        noTasksState.includes(task._id)) ? 
                        <td><strong>{task.title}</strong></td> : 
                        <td>{task.title}</td>}
                      <td>
                        {edit === 1 && (
                          <input 
                            type="radio" name={task._id} 
                            onChange={addTasks}
                            checked={yesTasksState.includes(task._id)}
                            value="1" />
                        )}
                        {edit === 0 && yesTasksState.includes(task._id) && <Check2 color="teal" size={20} />}
                        </td>
                      <td>
                        {edit === 1 && (
                          <input 
                            type="radio" name={task._id} 
                            onChange={addTasks} 
                            checked={noTasksState.includes(task._id)}
                            // {...noTasks.includes(task._id) && 'selected="selected"'}
                            value="0" />
                        )}
                        {edit === 0 && noTasksState.includes(task._id) && <X color="teal" size={20} />}
                      </td>
                    </tr>
                  ))}        
              </tbody>
            </table>          
            {mission !== null && edit === 1 && (
              <div className="items_right"><button className="missionBtn" type="submit">Update</button></div>
            )}
            {mission === null && (
              <div className="items_right"><button className="missionBtn" type="submit">Add</button></div>
            )}
        </form>
      )}
    </Fragment>
  );
};

export default MissionForm;