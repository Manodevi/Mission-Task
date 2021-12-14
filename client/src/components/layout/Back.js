import React, { Fragment, useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { CaretLeft } from 'react-bootstrap-icons';

const Back = props => {
  const location = useLocation();
  const path = location.pathname;
  const [ back, setBack ] = useState(0);

  useEffect(() => {
    if(path !== "/") {
      setBack(1);
    }

    return () => {
      setBack(0);
    }
  }, [path]); 

  return (
    <Fragment>
      {back === 1 && (
        <Link to="/" style={{position: "fixed"}}><CaretLeft color="#acb9c6" size={20} /></Link>
      )}
    </Fragment>
  );
};

export default Back;