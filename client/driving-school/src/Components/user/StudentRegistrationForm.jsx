import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function StudentRegistrationForm() {
  const [formData, setFormData] = useState({
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

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear validation error once user starts typing again
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await axios.post(
          "http://localhost:5000/registrationform",
          formData
        );
        console.log("Student added:", response.data);
        navigate("/successful");
      } catch (error) {
        console.error("Error creating student:", error);
      }
    }
  };

  const validateForm = () => {
    let valid = true;
    let newErrors = {};

    // First Name validation
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First Name is required";
      valid = false;
    }

    // Last Name validation
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last Name is required";
      valid = false;
    }

    // Date of Birth validation
    if (!formData.dob) {
      newErrors.dob = "Date of Birth is required";
      valid = false;
    }

    // Address Line 1 validation
    if (!formData.addressLine1.trim()) {
      newErrors.addressLine1 = "Address Line 1 is required";
      valid = false;
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email address is invalid";
      valid = false;
    }

    // Phone Number validation
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone Number is required";
      valid = false;
    } else if (!/^\d{10}$/.test(formData.phoneNumber.trim())) {
      newErrors.phoneNumber = "Phone Number must be 10 digits";
      valid = false;
    }

    // NIC Number validation
    if (!formData.nicNumber.trim()) {
      newErrors.nicNumber = "NIC Number is required";
      valid = false;
    } else if (
      !/^([0-9]{9}[x|X|v|V]|[0-9]{12})$/.test(formData.nicNumber.trim())
    ) {
      newErrors.nicNumber = "NIC Number is invalid";
      valid = false;
    }

    // Gender validation
    if (!formData.gender) {
      newErrors.gender = "Gender is required";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  return (
    <div className="container-sm w-50">
      <br />
      <form onSubmit={handleSubmit} className="p-4 border rounded">
        <div className="mb-3">
          <label htmlFor="firstName" className="form-label">
            First Name:
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className={`form-control ${errors.firstName && "is-invalid"}`}
            required
          />
          {errors.firstName && (
            <div className="invalid-feedback">{errors.firstName}</div>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="lastName" className="form-label">
            Last Name:
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className={`form-control ${errors.lastName && "is-invalid"}`}
            required
          />
          {errors.lastName && (
            <div className="invalid-feedback">{errors.lastName}</div>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="dob" className="form-label">
            Date of Birth:
          </label>
          <input
            type="date"
            id="dob"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            className={`form-control ${errors.dob && "is-invalid"}`}
            required
          />
          {errors.dob && <div className="invalid-feedback">{errors.dob}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="addressLine1" className="form-label">
            Address Line 1:
          </label>
          <input
            type="text"
            id="addressLine1"
            name="addressLine1"
            value={formData.addressLine1}
            onChange={handleChange}
            className={`form-control ${errors.addressLine1 && "is-invalid"}`}
            required
          />
          {errors.addressLine1 && (
            <div className="invalid-feedback">{errors.addressLine1}</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="addressLine2" className="form-label">
            Address Line 2:
          </label>
          <input
            type="text"
            id="addressLine2"
            name="addressLine2"
            value={formData.addressLine2}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="addressLine3" className="form-label">
            Address Line 3:
          </label>
          <input
            type="text"
            id="addressLine3"
            name="addressLine3"
            value={formData.addressLine3}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`form-control ${errors.email && "is-invalid"}`}
            required
          />
          {errors.email && (
            <div className="invalid-feedback">{errors.email}</div>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="phoneNumber" className="form-label">
            Phone Number:
          </label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className={`form-control ${errors.phoneNumber && "is-invalid"}`}
            required
          />
          {errors.phoneNumber && (
            <div className="invalid-feedback">{errors.phoneNumber}</div>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="nicNumber" className="form-label">
            NIC Number:
          </label>
          <input
            type="text"
            id="nicNumber"
            name="nicNumber"
            value={formData.nicNumber}
            onChange={handleChange}
            className={`form-control ${errors.nicNumber && "is-invalid"}`}
            required
          />
          {errors.nicNumber && (
            <div className="invalid-feedback">{errors.nicNumber}</div>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="gender" className="form-label">
            Gender:
          </label>
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className={`form-select ${errors.gender && "is-invalid"}`}
            required
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          {errors.gender && (
            <div className="invalid-feedback">{errors.gender}</div>
          )}
        </div>
        <button type="submit" className="btn btn-primary">
          Register
        </button>
      </form>
    </div>
  );
}

export default StudentRegistrationForm;
