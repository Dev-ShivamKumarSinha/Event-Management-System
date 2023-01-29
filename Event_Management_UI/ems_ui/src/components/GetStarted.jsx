import React from "react";
import { NavLink } from "react-router-dom";

function GetStarted() {
    return (
      <>
        <h1 className="pad">Get Started</h1>
        <div className="d-grid gap-2 col-6 pad">
          <NavLink to="/admin-login" className="btn btn-primary active" aria-current="page">Admin Login</NavLink>
          <NavLink to="/login" className="btn btn-primary active" aria-current="page">User Login</NavLink>
          <NavLink to="/register" className="btn btn-primary">Register</NavLink>
        </div>
      </>
    );
  }
  
  export default GetStarted;