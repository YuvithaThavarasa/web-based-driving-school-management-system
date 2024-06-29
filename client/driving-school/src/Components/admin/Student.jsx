import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import Footer from "../Layouts/Footer";

function Student() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/admin/student")
      .then((res) => {
        console.log("Fetched students:", res.data);
        setStudents(res.data);
      })
      .catch((err) => console.error("Error fetching students:", err));
  }, []);

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleDateString(); // Default format based on locale
  };

  const containerStyle = {
    display: "flex",
  };

  const contentStyle = {
    flex: 1,
    padding: "20px",
  };

  const innerContentStyle = {
    display: "flex",
    height: "100vh",
    justifyContent: "center",
    backgroundColor: "white",
  };

  const tableContainerStyle = {
    width: "70%",
    backgroundColor: "white",
    borderRadius: "5px",
    padding: "20px",
  };

  return (
    <div style={containerStyle}>
      <div>
        <Sidebar />
        <Footer />
      </div>
      <div style={contentStyle}>
        <div style={innerContentStyle}>
          <div style={tableContainerStyle}>
            <h1>Enrollment request</h1>
            <br />
            <table className="table table-bordered vh-90 align-items-top">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Date of Birth</th>
                  <th>Address line 1</th>
                  <th>Address line 2</th>
                  <th>Address line 3</th>
                  <th>Email</th>
                  <th>Phone Number</th>
                  <th>NIC Number</th>
                  <th>Gender</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student.ID}>
                    <td>{student.ID}</td>
                    <td>{student.firstName}</td>
                    <td>{student.lastName}</td>
                    <td>{formatDate(student.dob)}</td>
                    <td>{student.addressLine1}</td>
                    <td>{student.addressLine2}</td>
                    <td>{student.addressLine3}</td>
                    <td>{student.email}</td>
                    <td>{student.phoneNumber}</td>
                    <td>{student.nicNumber}</td>
                    <td>{student.gender}</td>
                    <td>
                      {student.accepted ? (
                        <button className="btn btn-success ms-2" disabled>
                          Accepted
                        </button>
                      ) : (
                        <Link
                          to={`/admin/acceptstudent/${student.ID}`}
                          className="btn btn-primary ms-2"
                        >
                          Accept
                        </Link>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Student;
