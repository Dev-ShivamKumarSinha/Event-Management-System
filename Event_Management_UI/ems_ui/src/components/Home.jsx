import React from "react";
import { NavLink } from "react-router-dom";

function Home() {
    return (
      <>
        <section id="header" className="">
            <div className="container-fluid nav_bg">
                <div className="row">
                    <div className="col-10 mx-auto">
                        <div className="col-md-6 pt-5 pt-lg-0 order-2 order-lg-1 pad">
                            <h1><strong>Event Management System</strong></h1>
                            <h2 className="my-3">Enroll for free Events online</h2>
                            <div className="mt-3">
                                <NavLink to="/get-started" className="btn-get-started">Get Started</NavLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
      </>
    );
  }
  
  export default Home;