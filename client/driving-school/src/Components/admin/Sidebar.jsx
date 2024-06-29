import React from "react";
import {
  FaHome,
  FaUserGraduate,
  FaCalendarAlt,
  FaUsers,
  FaSignOutAlt,
  FaCar,
  FaMoneyCheck,
  FaBook,
  FaFile,
  FaCalendar,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import "./SidebarDesign.css";

function Sidebar({ adminName }) {
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
            <span>Admin</span>
          </h5>
          <h3>
            Welcome <span>{adminName}</span>
          </h3>
        </span>
      </div>
      <ul className="side-menu top">
        <li>
          <Link to="/admin/dashboard">
            <FaHome /> Dashboard
          </Link>
        </li>

        <li>
          <Link to="/admin/registered-students">
            <FaUsers /> Students
          </Link>
        </li>

        <li>
          <Link to="/admin/instructor">
            <FaUsers /> Instructors
          </Link>
        </li>

        <li>
          <Link to="/admin/fleet">
            <FaCar /> Fleet
          </Link>
        </li>

        <li>
          <Link to="/admin/pricing">
            <FaMoneyCheck /> Pricing
          </Link>
        </li>

        <li>
          <Link to="/admin/session/add">
            <FaCalendarAlt /> Time Table
          </Link>
        </li>
        <li>
          <Link to="/admin/learning-materials">
            <FaBook /> Learning materials
          </Link>
        </li>
        <li>
          <Link to="/admin/booking">
            <FaCalendar /> Booking
          </Link>
        </li>
        <li>
          <Link to="/admin/income">
            <FaFile /> Reports
          </Link>
        </li>
        <li>
          <Link to="/admin/register">
            <FaUsers /> Manage Users
          </Link>
        </li>
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

export default Sidebar;
