import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Footer from "../Layouts/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUsers,
  faCalendarAlt,
  faUserClock,
} from "@fortawesome/free-solid-svg-icons";
import InsSidebar from "./InsSidebar";

function InstructorDashboard() {
  const [totalCourses, setTotalCourses] = useState(0);
  const [upcomingSessions, setUpcomingSessions] = useState(0);
  const [totalStudents, setTotalStudents] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem("token");

    // Fetch total courses
    axios
      .get("http://localhost:5000/instructor/total-courses", {
        headers: { "x-access-token": token },
      })
      .then((res) => {
        setTotalCourses(res.data.totalCourses);
      })
      .catch((err) => {
        console.error("Error fetching total courses:", err);
      });

    // Fetch upcoming sessions
    axios
      .get("http://localhost:5000/instructor/upcoming-sessions", {
        headers: { "x-access-token": token },
      })
      .then((res) => {
        setUpcomingSessions(res.data.upcomingSessions);
      })
      .catch((err) => {
        console.error("Error fetching upcoming sessions:", err);
      });

    // Fetch total students taught
    axios
      .get("http://localhost:5000/instructor/total-students", {
        headers: { "x-access-token": token },
      })
      .then((res) => {
        setTotalStudents(res.data.totalStudents);
      })
      .catch((err) => {
        console.error("Error fetching total students:", err);
      });
  }, []);

  return (
    <div>
      <InsSidebar />
      <div className="container">
        <h1 className="mt-3 mb-4">Instructor Dashboard</h1>
        <div className="row">
          <div className="col-md-4">
            <div className="card bg-primary text-white">
              <div className="card-body">
                <h5 className="card-title">
                  <FontAwesomeIcon icon={faUsers} /> Total Courses
                </h5>
                <p className="card-text">{totalCourses}</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card bg-secondary text-white">
              <div className="card-body">
                <h5 className="card-title">
                  <FontAwesomeIcon icon={faCalendarAlt} /> Upcoming Sessions
                </h5>
                <p className="card-text">{upcomingSessions}</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card bg-dark text-white">
              <div className="card-body">
                <h5 className="card-title">
                  <FontAwesomeIcon icon={faUserClock} /> Total Students Taught
                </h5>
                <p className="card-text">{totalStudents}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default InstructorDashboard;
