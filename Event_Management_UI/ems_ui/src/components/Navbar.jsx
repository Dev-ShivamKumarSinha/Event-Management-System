import React from "react";
import { NavLink } from "react-router-dom";
import brand from "../static/Ems3.png"

function Navbar() {
  return (
    <>
      <div className="container-fluid nav_bg">
        <div className="row">
          <div className="col-12 mx-auto">
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
              <div className="container-fluid">
              <img className="img-Logo" src={brand} alt='Event Management System' />
                {sessionStorage.getItem("IsLoggedIn") ? (
                    <div className="navbar-brand menu_active">
                      Event Management System
                    </div>
                ) : (
                    <NavLink exact className="navbar-brand menu_active" to="/">
                      Event Management System
                    </NavLink>
                )}
                <button
                  className="navbar-toggler"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarSupportedContent"
                  aria-controls="navbarSupportedContent"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span className="navbar-toggler-icon"></span>
                </button>
                <div
                  className="collapse navbar-collapse"
                  id="navbarSupportedContent"
                >
                  <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                    {!sessionStorage.getItem("IsLoggedIn") && (
                      <>
                        <li className="nav-item">
                          <NavLink
                            exact
                            className="nav-link menu_active"
                            aria-current="page"
                            to="/"
                          >
                            Home
                          </NavLink>
                        </li>
                        <li className="nav-item">
                          <NavLink
                            exact
                            className="nav-link menu_active"
                            to="/get-started"
                          >
                            Get Started
                          </NavLink>
                        </li>
                      </>
                    )}
                  </ul>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
