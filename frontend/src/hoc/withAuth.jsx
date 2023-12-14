import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const withAuth = (Component) => {
  
  const WrappedComponent = (props) => {
    const navigate = useNavigate();
    const [user, setUser] = useState();

    useEffect(() => {
      const token = localStorage.getItem("token");

      if (!token) {
        return navigate("/login");
      }
      
      try {
        setUser(jwtDecode(token))
      } catch (error) {
        navigate("/login");
      }
    }, []);

    return <Component {...props} user={user} />;
  };

  return WrappedComponent;
};

export default withAuth;
