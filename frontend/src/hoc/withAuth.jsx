import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const withAuth = (Component) => {
  const WrappedComponent = (props) => {
    const navigate = useNavigate();

    useEffect(() => {
      const token = localStorage.getItem('token');
      
      if (!token) {
        return navigate('/login');
      }
    }, []);

    return <Component {...props} />;
  };

  return WrappedComponent;
};

export default withAuth;
