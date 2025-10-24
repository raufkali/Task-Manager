import React from "react";
import { NavLink } from "react-router-dom";

const Nav = () => {
  return (
    <div className="navbar px-5 navbar-expand navbar-dark bg-dark">
      <div className="navbar-brand">LOGO</div>
      <ul className="navbar-nav ms-auto me-5">
        <li className="navbar-item">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Home
          </NavLink>
        </li>

        <li className="navbar-item">
          <NavLink
            to="/tasks"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Tasks
          </NavLink>
        </li>

        <li className="navbar-item">
          <NavLink
            to="/login"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Login
          </NavLink>
        </li>
        <li className="navbar-item">
          <NavLink
            to="/Register"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Register
          </NavLink>
        </li>
        <li className="navbar-item">
          <NavLink
            to="/Current"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Current
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Nav;
