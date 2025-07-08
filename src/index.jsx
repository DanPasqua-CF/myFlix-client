import { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Container from "react-bootstrap/Container";
import LoginView from "./components/login-view/login-view";
import MainView from "./components/main-view/main-view";
import SignupView from "./components/signup-view/signup-view";

import "./index.scss";
import { useState } from "react";

const App = () => {
  const [user, setUser] = useState(() => {
    return JSON.parse(localStorage.getItem("user")) || null;
  });

  const [token, setToken] = useState(() => {
    return localStorage.getItem("token") || null;
  });

  useEffect(() => {
    if (user && token) {
      setUser(user);
      setToken(token);
    }
  }, []);

  const handleLoggedIn = (userData, tokenData) => {
    setUser(userData);
    setToken(tokenData);

    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", tokenData);

    console.log(`User logged successfully logged in: `, userData);
  };

  const handleLogout = () => {
    setUser(null);
    setToken(null);
    localStorage.clear();
  };

  return (
    <BrowserRouter>
      <Container className="mt-4">
        <Routes>
          <Route
            path="/login"
            element={
              user ? (
                <Navigate to="/" replace />
              ) : (
                <LoginView onLoggedIn={handleLoggedIn} />
              )
            }
          />
          <Route
            path="/signup"
            element={user ? <Navigate to="/" replace /> : <SignupView />}
          />
          <Route
            path="/*"
            element={
              user ? (
                <MainView
                  user={user}
                  token={token}
                  onLoggedOut={handleLogout}
                />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
        </Routes>
      </Container>
    </BrowserRouter>
  );
};

const container = document.querySelector("#root");
const root = createRoot(container);

root.render(<App />);
