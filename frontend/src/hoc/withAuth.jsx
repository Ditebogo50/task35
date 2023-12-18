import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

// Higher-order component that takes another component (Component) as input
const withAuth = (Component) => {
  
  const WrappedComponent = (props) => {
    const navigate = useNavigate();
    // useState hook to store the user state
    const [user, setUser] = useState();

    // useEffect hook with an empty dependency array to run only once, when the component mounts
    useEffect(() => {
      // Retrieve the token from local storage
      const token = localStorage.getItem("token");

      if (!token) {
        // If token is not present, navigate to the login page
        return navigate("/login");
      }
      
      try {
        // Try to decode the token and set the user state
        setUser(jwtDecode(token))
      } catch (error) {
        // If an error occurs during decoding, navigate to the login page
        navigate("/login");
      }
    }, []);

    // Render the input component (Component) with additional props: user
    return <Component {...props} user={user} />;
  };

  // Return the wrapped component
  return WrappedComponent;
};

// Export the withAuth higher-order component
export default withAuth;

