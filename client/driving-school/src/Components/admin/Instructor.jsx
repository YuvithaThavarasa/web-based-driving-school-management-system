import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import Footer from "../Layouts/Footer";

function Instructor() {
  const [instructors, setInstructors] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/admin/instructor")
      .then((res) => {
        console.log("Fetched instructors:", res.data);
        setInstructors(res.data);
      })
      .catch((err) => console.error("Error fetching instructors:", err));
  }, []);

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleDateString(); // Default format based on locale
  };

  return (
    <div className="container mt-0 ">
      <Sidebar />
      <Footer />

      <div className="d-flex vh-100 bg-white justify-content-center ">
        <div className="w-60 bg-white rounded p-3">
          <Link to="/admin/instructorreg" className="btn btn-success mb-3">
            Add +
          </Link>
          <h2>Instructors details</h2>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Date of Birth</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th>NIC Number</th>
                <th>Gender</th>
                <th>Specialized Vehicles</th>
              </tr>
            </thead>
            <tbody>
              {instructors.map((instructor) => (
                <tr key={instructor.ID}>
                  <td>{instructor.ID}</td>
                  <td>{instructor.firstName}</td>
                  <td>{instructor.lastName}</td>
                  <td>{formatDate(instructor.dob)}</td>
                  <td>{instructor.email}</td>
                  <td>{instructor.phoneNumber}</td>
                  <td>{instructor.nicNumber}</td>
                  <td>{instructor.gender}</td>
                  <td>{instructor.vehicles}</td>{" "}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Instructor;
