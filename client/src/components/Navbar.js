import React from "react";
import { Logo } from "./Logo";
import Auth from "../helpers/auth";
import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <div className="navbar">
      <div className="logo">
        <Logo />
      </div>
      <div className="nav-cont">
        <ul className="nav-buttons">
          {Auth.loggedIn() ? (
            <>
              <li>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "active" : "unactive"
                  }
                  to="/home"
                >
                  <i class="fa-solid fa-house"></i>
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "active" : "unactive"
                  }
                  to="/create"
                >
                  <i class="fa-solid fa-plus"></i>
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "active" : "unactive"
                  }
                  to="/profile"
                >
                  <i class="fa-solid fa-user"></i>
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <NavLink
                className={({ isActive }) => (isActive ? "active" : "unactive")}
                to="/login"
              >
                <li>
                  <i class="fa-solid fa-right-to-bracket"> Login</i>
                </li>
              </NavLink>
            </>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
