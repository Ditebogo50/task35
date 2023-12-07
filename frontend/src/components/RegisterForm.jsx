import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useToast from "../hooks/useToast";

const RegisterForm = () => {
  const navigate = useNavigate();
  const { toastError } = useToast();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3001/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      if (response.ok) {
        // Registration successful, save JWT token to localStorage
        localStorage.setItem("token", data.token);
        // Redirect to login
        return navigate("/login");
      } else {
        // Handle registration error, show error message to user
        toastError(data.message);
      }
    } catch (error) {
      // Handle network or server error
      toastError("Network error!");
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegisterForm;
