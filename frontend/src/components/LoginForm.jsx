import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useToast from "../hooks/useToast";

const LoginForm = () => {
  const navigate = useNavigate();
  const { toastError } = useToast();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3001/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      if (response.ok) {
        // Login successful, save JWT token to localStorage
        localStorage.setItem("token", data.token);
        // Redirect to dashboard
        return navigate("/dashboard", { state: { fromLogin: true } });
      } else {
        // Handle login error, show error message to user
        toastError(data.message);
      }
    } catch (error) {
      // Handle network or server error
      toastError("Network error!");
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>Login</h2>
      <div className="form-field">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="form-field">
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="form-field">
        <button type="submit">Login</button>
      </div>
    </form>
  );
};

export default LoginForm;
