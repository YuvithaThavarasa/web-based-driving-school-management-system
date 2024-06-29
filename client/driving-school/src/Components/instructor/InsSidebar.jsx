import React from "react";
import {
  FaHome,
  FaCalendarAlt,
  FaUsers,
  FaSignOutAlt,
  FaBook,
  FaTimesCircle,
} from "react-icons/fa";
import { Link } from "react-router-dom";
//import "./SidebarDesign.css";

function InsSidebar({ adminName }) {
  const handleLogout = () => {
    // Clear token and role from local storage
    localStorage.removeItem("token");
    localStorage.removeItem("role");

    window.location.href = "/login";
  };

  return (
    <section id="sidebar">
      <div className="brand">
        <span className="text">
          <h5>
            <span>Instructor</span>
          </h5>
          <h3>
            Welcome <span>{adminName}</span>
          </h3>
        </span>
      </div>
      <ul className="side-menu top">
        {/* <li>
          <Link to="/instructor/dashboard">
            <FaHome /> Dashboard
          </Link>
        </li> */}

        <li>
          <Link to="/instructor/session">
            <FaCalendarAlt /> Sessions
          </Link>
        </li>

        <li>
          <Link to="/instructor/learning-materials">
            <FaBook /> Learning materials
          </Link>
        </li>

        {/* <li>
          <Link to="/instructor/availability">
            <FaTimesCircle /> Availability
          </Link>
        </li>

        <li>
          <FaUsers /> Manage profile
        </li>

        <li>
          <FaUsers /> Announcement
        </li> */}
      </ul>
      <ul className="side-menu">
        <li>
          <button onClick={handleLogout}>
            <FaSignOutAlt /> Logout
          </button>
        </li>
      </ul>
    </section>
  );
}

export default InsSidebar;
