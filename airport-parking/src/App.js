import * as React from "react";
import { BrowserRouter, Routes, Route, useLocation, Navigate, } from "react-router-dom";
import Layout from "./component/Layout";
import AirportAvailability from "./pages/AirportAvailability";
import HomePage from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import './style.css';
import {useSelector} from './redux';

export default function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="results" element={<AirportAvailability />} />

            <Route
              path="/profile"
              element={
                <RequireAuth>
                  <Profile />
                </RequireAuth>
              }
            />
            <Route path="*" element={<HomePage />} />
          </Route>
        </Routes>
      </BrowserRouter>
  );
}


function RequireAuth({ children }) {
  const {authenticated}=useSelector((s)=>s.session)
  let location = useLocation();

  if (!authenticated) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}