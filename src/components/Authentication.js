import React from "react";
import useAuthentication from "../hooks/useAuthentication";
import NewPost from "./NewPost";

const Authentication = () => {
  const {
    user,
    email,
    password,
    isSignUp,
    error,
    setEmail,
    setPassword,
    setIsSignUp,
    handleLogin,
    handleSignUp,
    handleLogout,
  } = useAuthentication();

  return (
    <div>
      {user ? (
        <>
          <div>
            <h2>Welcome, {user.email}</h2>
            <button onClick={handleLogout}>Logout</button>
          </div>
          <NewPost />
        </>
      ) : (
        <div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {isSignUp ? (
            <button onClick={handleSignUp}>Sign Up</button>
          ) : (
            <button onClick={handleLogin}>Login</button>
          )}
          <button onClick={() => setIsSignUp(!isSignUp)}>
            {isSignUp ? "Switch to Login" : "Switch to Sign Up"}
          </button>
          {error && <p>{error}</p>}
        </div>
      )}
    </div>
  );
};

export default Authentication;
