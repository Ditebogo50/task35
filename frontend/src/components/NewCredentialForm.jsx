import React, { useState } from "react";
import useToast from "../hooks/useToast";
import { useNavigate } from "react-router-dom";

const NewCredentialForm = ({ division }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { toastError } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const endpoint =
      `http://localhost:3001/api/division/${division}/credentials`;

    const token = localStorage.getItem("token");

    const requestBody = {
      username: username,
      password: password,
    };

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        // Handle successful response
        return navigate(`/division/${division}`);
      } else {
        // Handle error response
        toastError("Failed to post to endpoint");
      }
    } catch (error) {
      // Handle network or other error
      toastError("Error occurred while posting to endpoint:", error);
    }
  };

  return (
    <div>
      <h3>Create new Credential</h3>
      <form onSubmit={handleSubmit}>
        <label>Username:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button type="submit">Create Credential</button>
      </form>
    </div>
  );
};

export default NewCredentialForm;
