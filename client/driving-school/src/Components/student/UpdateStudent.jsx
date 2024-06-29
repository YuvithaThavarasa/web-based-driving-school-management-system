import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import StuSidebar from "./StuSidebar";
import Footer from "../Layouts/Footer";

function UpdateStudent() {
  const { id } = useParams(); // Extract student ID from URL params
  const [student, setStudent] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    addressLine1: "",
    addressLine2: "",
    addressLine3: "",
    email: "",
    phoneNumber: "",
    nicNumber: "",
    gender: "",
  });

  useEffect(() => {
    // Fetch student details based on ID
    axios
      .get(`http://localhost:5000/admin/student/${id}`)
      .then((res) => {
        console.log("Fetched student:", res.data);
        setStudent(res.data);
      })
      .catch((err) => console.error("Error fetching student:", err));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent((prevStudent) => ({
      ...prevStudent,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/admin/student/${id}`, student)
      .then((res) => {
        console.log("Student updated successfully:", res.data);
        // Optionally, show a success message or navigate back to student list
      })
      .catch((err) => console.error("Error updating student:", err));
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <StuSidebar />
        <div className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
          <h2>Update Student Details</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="firstName" className="form-label">
                First Name
              </label>
              <input
                type="text"
                className="form-control"
                id="firstName"
                name="firstName"
                value={student.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="lastName" className="form-label">
                Last Name
              </label>
              <input
                type="text"
                className="form-control"
                id="lastName"
                name="lastName"
                value={student.lastName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="dob" className="form-label">
                Date of Birth
              </label>
              <input
                type="date"
                className="form-control"
                id="dob"
                name="dob"
                value={student.dob}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="addressLine1" className="form-label">
                Address Line 1
              </label>
              <input
                type="text"
                className="form-control"
                id="addressLine1"
                name="addressLine1"
                value={student.addressLine1}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="addressLine2" className="form-label">
                Address Line 2
              </label>
              <input
                type="text"
                className="form-control"
                id="addressLine2"
                name="addressLine2"
                value={student.addressLine2}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="addressLine3" className="form-label">
                Address Line 3
              </label>
              <input
                type="text"
                className="form-control"
                id="addressLine3"
                name="addressLine3"
                value={student.addressLine3}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={student.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="phoneNumber" className="form-label">
                Phone Number
              </label>
              <input
                type="text"
                className="form-control"
                id="phoneNumber"
                name="phoneNumber"
                value={student.phoneNumber}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="nicNumber" className="form-label">
                NIC Number
              </label>
              <input
                type="text"
                className="form-control"
                id="nicNumber"
                name="nicNumber"
                value={student.nicNumber}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="gender" className="form-label">
                Gender
              </label>
              <select
                className="form-select"
                id="gender"
                name="gender"
                value={student.gender}
                onChange={handleChange}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <button type="submit" className="btn btn-primary me-2">
              Update
            </button>
            <Link to="/admin/students" className="btn btn-secondary">
              Cancel
            </Link>
          </form>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default UpdateStudent;
