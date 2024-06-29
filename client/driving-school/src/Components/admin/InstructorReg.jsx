import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function InstructorReg() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    email: "",
    phoneNumber: "",
    nicNumber: "",
    gender: "",
    vehicles: [],
  });
  const [vehicleTypes, setVehicleTypes] = useState([]);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // Fetch vehicle types from the fleet table
  useEffect(() => {
    axios
      .get("http://localhost:5000/admin/fleet")
      .then((res) => {
        const uniqueVehicleTypes = Array.from(
          new Set(res.data.map((fleet) => fleet.vehicleType))
        );
        setVehicleTypes(uniqueVehicleTypes);
      })
      .catch((err) => console.error("Error fetching vehicle types:", err));
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData((prevFormData) => {
        if (checked) {
          return {
            ...prevFormData,
            vehicles: [...prevFormData.vehicles, value],
          };
        } else {
          return {
            ...prevFormData,
            vehicles: prevFormData.vehicles.filter(
              (vehicle) => vehicle !== value
            ),
          };
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await axios.post(
          "http://localhost:5000/admin/instructorreg",
          formData
        );
        console.log("Instructor added:", response.data);
        navigate("/admin/instructor");
      } catch (error) {
        console.error("Error creating instructor:", error);
      }
    }
  };

  const validateForm = () => {
    let errors = {};
    let formIsValid = true;

    // First Name validation
    if (!formData.firstName) {
      formIsValid = false;
      errors.firstName = "First Name is required";
    }

    // Last Name validation
    if (!formData.lastName) {
      formIsValid = false;
      errors.lastName = "Last Name is required";
    }

    // Date of Birth validation
    if (!formData.dob) {
      formIsValid = false;
      errors.dob = "Date of Birth is required";
    }

    // Email validation
    if (!formData.email) {
      formIsValid = false;
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      formIsValid = false;
      errors.email = "Please enter a valid email address";
    }

    // Phone Number validation
    if (!formData.phoneNumber) {
      formIsValid = false;
      errors.phoneNumber = "Phone Number is required";
    }

    // NIC Number validation
    if (!formData.nicNumber) {
      formIsValid = false;
      errors.nicNumber = "NIC Number is required";
    }

    // Gender validation
    if (!formData.gender) {
      formIsValid = false;
      errors.gender = "Gender is required";
    }

    setErrors(errors);
    return formIsValid;
  };

  return (
    <div className="container-sm w-50">
      <br />
      <form onSubmit={handleSubmit} className="p-4 border rounded">
        <h2>Instructor registration</h2>
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
            className={`form-control ${errors.firstName ? "is-invalid" : ""}`}
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
            className={`form-control ${errors.lastName ? "is-invalid" : ""}`}
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
            className={`form-control ${errors.dob ? "is-invalid" : ""}`}
          />
          {errors.dob && <div className="invalid-feedback">{errors.dob}</div>}
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
            className={`form-control ${errors.email ? "is-invalid" : ""}`}
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
            className={`form-control ${errors.phoneNumber ? "is-invalid" : ""}`}
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
            className={`form-control ${errors.nicNumber ? "is-invalid" : ""}`}
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
            className={`form-select ${errors.gender ? "is-invalid" : ""}`}
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
        <div className="mb-3">
          <label className="form-label">Specialized Vehicles:</label>
          {vehicleTypes.map((vehicleType) => (
            <div key={vehicleType} className="form-check">
              <input
                type="checkbox"
                id={vehicleType}
                name="vehicles"
                value={vehicleType}
                onChange={handleChange}
                className="form-check-input"
              />
              <label htmlFor={vehicleType} className="form-check-label">
                {vehicleType}
              </label>
            </div>
          ))}
        </div>
        <button type="submit" className="btn btn-primary">
          Add
        </button>
      </form>
    </div>
  );
}

export default InstructorReg;
