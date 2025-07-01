import { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Container from "react-bootstrap/Container";
import LoginView from "./components/login-view/login-view";
import MainView from "./components/main-view/main-view";
import SignupView from "./components/signup-view/signup-view";

import "./index.scss";
import { useState } from "react";

const App = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser || null);
  const [token, setToken] = useState(storedToken || null);

  useEffect(() => {
    if (storedUser && storedToken) {
      setUser(storedUser);
      setToken(storedToken);
    }
  }, []);

  const handleLoggedIn = (userData, tokenData) => {
    setUser(userData);
    setToken(tokenData);

    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", tokenData);

    console.log(`User logged successfully logged in: `, userData);
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
            path="/users"
            element={user ? <Navigate to="/" replace /> : <SignupView />}
          />
          <Route
            path="/*"
            element={user ? <MainView /> : <Navigate to="/login" replace />}
          />
        </Routes>
      </Container>
    </BrowserRouter>
  );
};

const container = document.querySelector("#root");
const root = createRoot(container);

root.render(<App />);
