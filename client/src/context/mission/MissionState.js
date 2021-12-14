import { useReducer } from 'react';
import axios from 'axios';
import MissionContext from './missionContext';
import MissionReducer from './missionReducer';
import  {  
  SET_LOADING,
  GET_MISSIONS,
  GET_MISSION,
  ADD_MISSION,
  UPDATE_MISSION,
  DELETE_MISSION,
  GET_TASKS,
  SET_ALERT,
  CLEAR_MISSION
} from '../types';

const MissionState = props => {
  const initialState = {
    missions: [],
    mission: null,
    tasks: [],    
    loading: false,
    alerts: null
  };

  const [state, dispatch] = useReducer(MissionReducer, initialState);

  // Get Missions
  const getMissions = async () => {
    setLoading();
    console.log('context');
    
    try {    
      const axiosRes = await axios.get("/api/missions");
      dispatch({type: GET_MISSIONS, payload: axiosRes.data});    
  
    } catch (error) {      
      console.log(error);
    }
    
  };

  // Get Mission
  const getMission = async (missionId) => {
    setLoading();
    const axiosRes = await axios.get(`/api/missions/${missionId}`);
    console.log(axiosRes.data);
    dispatch({type: GET_MISSION, payload: axiosRes.data});    
  };

  // Add Mission
  const addMission = async (mission) => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const newMission = {        
        tasks: [...mission.yesTasks.map(task => { return {task, value: 1} }),
          ...mission.noTasks.map(task => { return {task, value: 0} })]
    };

    try {
      const res = await axios.post('/api/missions', newMission, config);      
      
      dispatch({type: ADD_MISSION, payload: res.data});
      setAlert([`Mission #${res.data.mission} is added successfully..`], 'success');
    } catch (error) {      
      console.log(error);
    }

  };

  // Clear Mission
  const clearMission = () => {
    dispatch({type: CLEAR_MISSION});
  };

  // Update Mission
  const updateMission = async (mission) => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const updateMissionValues = {      
      tasks: [...mission.yesTasks.map(task => { return {task, value: 1} }),
        ...mission.noTasks.map(task => { return {task, value: 0} })]
    };

    try {
      const res = await axios.put(`/api/missions/${mission.id}`, updateMissionValues, config);            
      dispatch({type: UPDATE_MISSION, payload: res.data});
      setAlert([`Mission #${res.data.mission} is updated successfully..`], 'success');
    } catch (error) {
      console.log(error);      
    }
  };

  // Delete Mission
  const deleteMission = async (mission) => {    
    await axios.delete(`/api/missions/${mission}`);
    dispatch({type: DELETE_MISSION, payload: mission});
    setAlert([`Mission is deleted successfully..`], 'success');
  };

  // Get Tasks
  const getTasks = async () => {
    setLoading();
    console.log('tasks context');
    const axiosRes = await axios.get("/api/tasks");
    dispatch({type: GET_TASKS, payload: axiosRes.data});        
  };

  // Set Loading
  const setLoading = () => {
    dispatch({type: SET_LOADING});
  }

  // Set Alert
  const setAlert = (message, type) => {
    dispatch({type: SET_ALERT, payload: {message, type}});
    setTimeout(() => dispatch({type: SET_ALERT, payload: null}), 5000);
  };

  return <MissionContext.Provider
     value = {{
      missions: state.missions,
      mission: state.mission,
      tasks: state.tasks,
      loading: state.loading,
      alerts: state.alerts,
      getMissions,
      getMission,
      addMission,
      clearMission,
      updateMission,
      deleteMission,
      getTasks,
      setLoading,
      setAlert
    }
  }>
    {props.children}
    </MissionContext.Provider>
};

export default MissionState;