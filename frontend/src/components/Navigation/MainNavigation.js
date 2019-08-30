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
        <React.Fragment>
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
                    <NavLink
                      to="/events"
                      onClick={context.deactivateViewDetail}
                    >
                      Events
                    </NavLink>
                  </li>

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
          {/* for mobile test*/}
          <div className="bar__container">
            <nav
              className={
                !context.isVisibleToBars
                  ? "main-navigation__items__mobile"
                  : "main-navigation__items__mobile open"
              }
              // className={
              //   context.isVisibleToBars
              //     ? "main-navigation__items__mobile"
              //     : "main-navigation__items__mobile_hidden"
              // }
            >
              <ul>
                {!context.token && (
                  <li onClick={context.FromBars}>
                    <NavLink to="/auth">SignUp | LogIn</NavLink>
                  </li>
                )}
                <li onClick={context.FromBars}>
                  <NavLink to="/events" onClick={context.deactivateViewDetail}>
                    Events
                  </NavLink>
                </li>

                {context.token && (
                  <React.Fragment>
                    <li onClick={context.FromBars}>
                      <NavLink to="/bookings">Bookings</NavLink>
                    </li>
                    <li onClick={context.FromBars}>
                      <button onClick={context.logout}>Logout</button>
                    </li>
                  </React.Fragment>
                )}
              </ul>
            </nav>
            {!context.isVisibleToBars ? (
              <FontAwesomeIcon
                icon="bars"
                size="lg"
                className="burger__bars"
                onClick={context.FromBars}
              />
            ) : (
              <FontAwesomeIcon
                icon="times-circle"
                size="lg"
                className="times-circle"
                onClick={context.TimesCircle}
              />
            )}
          </div>
          {/* for mobile */}
        </React.Fragment>
      );
    }}
  </AuthContext.Consumer>
);

export default MainNavigation;
