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

const MissionReducer = (state, action) => {
  switch(action.type) {
    case SET_LOADING:
      return {
        ...state,
        loading: true
      };
    
    case GET_MISSIONS:
      return {
        ...state,
        missions: action.payload,
        loading: false
      };

    case GET_MISSION:
        const mission = action.payload;
        const missionValues = {
          id: mission._id,
          mission: mission.mission,
          yesTasks: mission.tasks.filter(task => task.value === 1).map(task => {      
            return task.task;
          }),    
          noTasks:mission.tasks.filter(task => task.value === 0).map(task => {      
              return task.task;
          })
        };
      
      return {
        ...state,
        mission: missionValues,
        loading: false
      };

    case ADD_MISSION:      
      return {
        ...state,
        missions: [action.payload, ...state.missions]
      };

    case CLEAR_MISSION:
      return {
        ...state,
        mission: null
      };

    case UPDATE_MISSION:      
      return {
        ...state,
        missions: state.missions.map(mission=> {
          if(mission._id === action.payload._id) {
            return action.payload;
          } else {
            return mission;
          }
        })
      };

    case DELETE_MISSION:
      return {
        ...state,
        missions: state.missions.filter(mission => {
          return mission._id !== action.payload
        })
      };

    case GET_TASKS:
      return {
        ...state,
        tasks: action.payload,
        loading: false
      };
  
    case SET_ALERT:
      return {
        ...state,
        alerts: action.payload
      };
      
    default:
      return state;
  }
};

export default MissionReducer;