import React, { useState, useEffect } from "react";
import axios from "axios";

function ManageProfile({ studentId }) {
  const [formData, setFormData] = useState({
    addressLine1: "",
    addressLine2: "",
    addressLine3: "",
    email: "",
    phoneNumber: "",
  });

  useEffect(() => {
    // Fetch student details and populate the form
    axios
      .get(`http://localhost:5000/student/${studentId}`)
      .then((res) => {
        const { addressLine1, addressLine2, addressLine3, email, phoneNumber } =
          res.data;
        setFormData({
          addressLine1,
          addressLine2,
          addressLine3,
          email,
          phoneNumber,
        });
      })
      .catch((err) => console.error("Error fetching student details:", err));
  }, [studentId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/student/profile/${studentId}`, formData)
      .then((res) => console.log(res.data))
      .catch((err) => console.error("Error updating profile:", err));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="addressLine1">Address Line 1</label>
        <input
          type="text"
          name="addressLine1"
          value={formData.addressLine1}
          onChange={handleChange}
          className="form-control"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="addressLine2">Address Line 2</label>
        <input
          type="text"
          name="addressLine2"
          value={formData.addressLine2}
          onChange={handleChange}
          className="form-control"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="addressLine3">Address Line 3</label>
        <input
          type="text"
          name="addressLine3"
          value={formData.addressLine3}
          onChange={handleChange}
          className="form-control"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="form-control"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="phoneNumber">Phone Number</label>
        <input
          type="tel"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          className="form-control"
          required
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Update Profile
      </button>
    </form>
  );
}

export default ManageProfile;
