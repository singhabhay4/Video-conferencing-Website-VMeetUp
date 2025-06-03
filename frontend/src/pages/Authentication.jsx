


import React, { useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";


export default function Authentication() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [formState, setFormState] = useState(0); // 0 - Sign In, 1 - Sign Up
  const [open, setOpen] = useState(false);

  const { handleRegister, handleLogin } = useContext(AuthContext);

  const handleAuth = async () => {
    try {
      if (formState === 0) {
        await handleLogin(username, password);
      } else {
        const result = await handleRegister(name, username, password);
        setUsername("");
        setMessage(result);
        setOpen(true);
        setError("");
        setFormState(0);
        setPassword("");
        setName("");
      }
    } catch (err) {
      const msg = err.response?.data?.message || "Something went wrong";
      setError(msg);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-left">
        <img src="login.png" alt="Welcome Illustration" />
      </div>
      <div className="auth-box">
        <div className="auth-icon">
          <span role="img" aria-label="lock">
            🔒
          </span>
        </div>

        <div className="auth-toggle">
          <button
            className={formState === 0 ? "active" : ""}
            onClick={() => setFormState(0)}
          >
            Sign In
          </button>
          <button
            className={formState === 1 ? "active" : ""}
            onClick={() => setFormState(1)}
          >
            Sign Up
          </button>
        </div>

        <form className="auth-form" onSubmit={(e) => e.preventDefault()}>
          {formState === 1 && (
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          )}
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && <div className="auth-error">{error}</div>}

          <button type="button" className="auth-submit" onClick={handleAuth}>
            {formState === 0 ? "Login" : "Register"}
          </button>
        </form>
      </div>

      {open && (
        <div className="auth-snackbar">
          {message}
          <button onClick={() => setOpen(false)}>✖</button>
        </div>
      )}
    </div>
  );
}
