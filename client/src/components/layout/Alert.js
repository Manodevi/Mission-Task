import { useContext } from 'react';
import context from '../../context/mission/missionContext';

const Alert = props => {
  const missionContext = useContext(context);
  const alerts = missionContext.alerts;

  return (    
      alerts !== null && (
        <div className={`alert alert-${alerts.type}`}>
          {alerts.message.map((alert, index) => (
            <p key={`msg-${index}`}><i className='fas fa-info-circle' /> {alert}</p>
          ))}
        </div>
      )      
  );
};

export default Alert;