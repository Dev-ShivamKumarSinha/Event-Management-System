import React from "react";
import "./index.css"
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import User from "./pages/User";
import Events from "./components/Events";
import EnrolledEvents from "./components/EnrolledEvents";
import { Login, Register } from "./pages/Login-Register";
import GetStarted from "./components/GetStarted";
import MarkPresent from "./components/MarkPresent";
import Admin from "./pages/Admin";
import { Routes, Route, Navigate } from "react-router-dom";
import AdmLogin from "./components/AdmLogin";
import EnrolledUsers from "./components/EnrolledUsers";
import CreateEvent from "./components/CreateEvent";
import ProtectedRoutes from "./util/ProtectedRoutes";

function App() {
  return (
    <div className="body-full">
      <>
        <Navbar />
        <Routes>
          <Route element={<ProtectedRoutes />}>
            <Route exact path="/user" element={<User />} />
            <Route exact path="/events" element={<Events />} />
            <Route exact path="/enrolled-events" element={<EnrolledEvents />} />
            <Route exact path="/mark-present" element={<MarkPresent />} />
            <Route exact path="/admin" element={<Admin />} />
            <Route exact path="/enrolled-users" element={<EnrolledUsers />} />
            <Route exact path="/create-event" element={<CreateEvent />} />
          </Route>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/get-started" element={<GetStarted />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/admin-login" element={<AdmLogin />} />
          <Route path="/*" element={<Navigate to="/" />} />
        </Routes>
      </>
    </div>
  );
}

export default App;
