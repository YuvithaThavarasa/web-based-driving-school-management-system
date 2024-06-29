import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddVehicle() {
  const [formData, setFormData] = useState({
    name: "",
    vehicleType: "",
    numberPlate: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await axios.post(
          "http://localhost:5000/admin/fleet/add",
          formData
        );
        console.log("Vehicle added:", response.data);
        navigate("/admin/fleet"); // Navigate back to fleet page
      } catch (error) {
        console.error("Error adding vehicle:", error);
      }
    }
  };

  const validateForm = () => {
    let errors = {};
    let formIsValid = true;

    // Name validation
    if (!formData.name.trim()) {
      formIsValid = false;
      errors.name = "Name is required";
    }

    // Vehicle Type validation
    if (!formData.vehicleType.trim()) {
      formIsValid = false;
      errors.vehicleType = "Vehicle Type is required";
    }

    // Number Plate validation
    if (!formData.numberPlate.trim()) {
      formIsValid = false;
      errors.numberPlate = "Number Plate is required";
    }

    setErrors(errors);
    return formIsValid;
  };

  return (
    <div className="container mt-5">
      <h2>Add New Vehicle</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`form-control ${errors.name ? "is-invalid" : ""}`}
            required
          />
          {errors.name && <div className="invalid-feedback">{errors.name}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="vehicleType" className="form-label">
            Vehicle Type
          </label>
          <input
            type="text"
            id="vehicleType"
            name="vehicleType"
            value={formData.vehicleType}
            onChange={handleChange}
            className={`form-control ${errors.vehicleType ? "is-invalid" : ""}`}
            required
          />
          {errors.vehicleType && (
            <div className="invalid-feedback">{errors.vehicleType}</div>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="numberPlate" className="form-label">
            Number Plate
          </label>
          <input
            type="text"
            id="numberPlate"
            name="numberPlate"
            value={formData.numberPlate}
            onChange={handleChange}
            className={`form-control ${errors.numberPlate ? "is-invalid" : ""}`}
            required
          />
          {errors.numberPlate && (
            <div className="invalid-feedback">{errors.numberPlate}</div>
          )}
        </div>
        <button type="submit" className="btn btn-primary">
          Add Vehicle
        </button>
      </form>
    </div>
  );
}

export default AddVehicle;
