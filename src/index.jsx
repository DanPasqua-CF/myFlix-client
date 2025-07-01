import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Container from "react-bootstrap/Container";
import LoginView from "./components/login-view/login-view";
import MainView from "./components/main-view/main-view";
import MovieView from "./components/movie-view/movie-view";
import ProfileView from "./components/profile-view/profile-view";
import SignupView from "./components/signup-view/signup-view";

import "./index.scss";
import { useState } from "react";

const App = () => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  const handleLoggedIn = (userData, tokenData) => {
    setUser(userData);
    setToken(tokenData);

    console.log(`User logged successfully logged in: `, userData);
  };

  return (
    <BrowserRouter>
      <Container className="mt-4">
        <Routes>
          <Route path="/*" element={<MainView />} />
          <Route
            path="/login"
            element={<LoginView onLoggedIn={handleLoggedIn} />}
          />
          <Route path="/users" element={<SignupView />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
};

const container = document.querySelector("#root");
const root = createRoot(container);

root.render(<App />);
