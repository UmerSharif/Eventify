import React from "react";

import { NavLink } from "react-router-dom";
import "./MainNavigation.css";
import AuthContext from "../../context/auth-context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import Bars from "./Bars";

const MainNavigation = props => (
  <AuthContext.Consumer>
    {context => {
      return (
        <div className="main-navigation-container">
          <header className="main-navigation">
            {/* for curved design */}
            <svg
              className="svg__stuff"
              viewBox="0 0 500 150"
              preserveAspectRatio="none"
            >
              <path
                className="path__stuff"
                d="M0.00,92.27 C216.83,192.92 304.30,8.39 500.00,109.03 L500.00,0.00 L0.00,0.00 Z"
              />
              {/* <rect
              x="10"
              y="10"
              width="1000"
              height="150"
              fill="#044B94"
              fill-opacity="0.4"
            />
            <foreignObject
              x="10"
              y="10"
              style={{
                width: "500px",
                height: "100px"
              }}
            >
            </foreignObject> */}
            </svg>
            {/* for curved design */}
            <div className="main-navigation__logo">
              <p style={{ color: "beige" }}>Eventify</p>
            </div>
            <nav className="main-navigation__items">
              <ul>
                {!context.token && (
                  <li>
                    <NavLink to="/auth">SignUp | LogIn</NavLink>
                  </li>
                )}
                <li>
                  <NavLink to="/events" onClick={context.deactivateViewDetail}>
                    Events
                  </NavLink>
                </li>
                <FontAwesomeIcon
                  icon="bars"
                  size="lg"
                  style={{ color: "beige" }}
                  onClick={context.FromBars}
                />
                {context.token && (
                  <React.Fragment>
                    <li>
                      <NavLink to="/bookings">Bookings</NavLink>
                    </li>
                    <li>
                      <button onClick={context.logout}>Logout</button>
                    </li>
                  </React.Fragment>
                )}
              </ul>
            </nav>
          </header>
        </div>
      );
    }}
  </AuthContext.Consumer>
);

export default MainNavigation;
