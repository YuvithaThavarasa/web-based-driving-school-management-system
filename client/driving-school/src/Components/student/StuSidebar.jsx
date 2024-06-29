import React from "react";
import { FaCalendarAlt, FaUsers, FaSignOutAlt, FaBook } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./SidebarDesign.css";

function StuSidebar({ adminName }) {
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
            <span>Student</span>
          </h5>
          <h3>
            Welcome <span>{adminName}</span>
          </h3>
        </span>
      </div>
      <ul className="side-menu top">
        {/* <li>
          <Link to="#">
            <FaHome /> Dashboard
          </Link>
        </li> */}

        <li>
          <Link to="/student/session/">
            <FaCalendarAlt /> Book sessions
          </Link>
        </li>

        <li>
          <Link to="/student/learning-materials">
            <FaBook /> Learning materials
          </Link>
        </li>
        {/* 
        <li>
          <FaUsers /> Manage profile
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

export default StuSidebar;
