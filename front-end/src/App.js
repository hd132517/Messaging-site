import "./App.css";
import React from "react";
import Cookies from "universal-cookie";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import CreateAccount from "./pages/CreateAccount";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Messages from "./pages/Messages";
import Information from "./pages/Information";
import LogOut from "./pages/Logout";
import Logout from "./pages/Logout";

const cookies = new Cookies();

function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [loggedInUser, setLoggedInUser] = React.useState(null);

  React.useEffect(() => {
    // can do stuff here on startup
    console.log(cookies.get("auth"));
  }, []);

  return (
    <div className="App">
      <Router>
        <div className="nav">
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              {!isLoggedIn && (
                <li>
                  <Link to="/createAccount">Create Account</Link>
                </li>
              )}
              {!isLoggedIn && (
                <li>
                  <Link to="/login">Login</Link>
                </li>
              )}
              {isLoggedIn && (
                <li>
                  <Link to="/messages">Messages</Link>
                </li>
              )}
              {isLoggedIn && (
                <li>
                  <Link to="/information">Information</Link>
                </li>
              )}
              {isLoggedIn && (
                <li>
                  <Link to="/logout">log out</Link>
                </li>
              )}
            </ul>
          </nav>

          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <Routes>
            <Route
              path="/messages"
              element={
                <Messages
                  setIsLoggedIn={setIsLoggedIn}
                  isLoggedIn={isLoggedIn}
                  loggedInUser={loggedInUser}
                  setLoggedInUser={setLoggedInUser}
                />
              }
            />
            <Route
              path="/login"
              element={
                <Login
                  setIsLoggedIn={setIsLoggedIn}
                  isLoggedIn={isLoggedIn}
                  setLoggedInUser={setLoggedInUser}
                  loggedInUser={loggedInUser}
                />
              }
            />
            <Route
              path="/information"
              element={
                <Information
                  setIsLoggedIn={setIsLoggedIn}
                  isLoggedIn={isLoggedIn}
                  setLoggedInUser={setLoggedInUser}
                  loggedInUser={loggedInUser}
                />
              }
            />
            <Route
              path="/logout"
              element={
                <Logout
                  setIsLoggedIn={setIsLoggedIn}
                  isLoggedIn={isLoggedIn}
                  setLoggedInUser={setLoggedInUser}
                  loggedInUser={loggedInUser}
                />
              }
            />
            <Route path="/createAccount" element={<CreateAccount />} />
            <Route
              path="/"
              element={
                <Home setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} />
              }
            />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
