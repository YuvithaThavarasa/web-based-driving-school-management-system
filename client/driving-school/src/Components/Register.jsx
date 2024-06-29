import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Sidebar from "./admin/Sidebar";

function Register() {
  const [values, setValues] = useState({
    email: "",
    password: "",
    role: "",
  });
  const [message, setMessage] = useState(null);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      axios
        .post("http://localhost:5000/admin/register", values)
        .then((res) => {
          if (res.data.status === "Success") {
            setMessage("User successfully added!");
            setValues({ email: "", password: "", role: "" });
            setTimeout(() => setMessage(null), 3000);
          } else {
            setMessage("Error adding user.");
          }
        })
        .catch((err) => {
          console.error("Error:", err);
          setMessage("Error adding user.");
        });
    }
  };

  const validateForm = () => {
    let errors = {};
    let formIsValid = true;

    // Email validation
    if (!values.email) {
      formIsValid = false;
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      formIsValid = false;
      errors.email = "Email address is invalid";
    }

    // Password validation
    if (!values.password) {
      formIsValid = false;
      errors.password = "Password is required";
    } else if (values.password.length < 4) {
      formIsValid = false;
      errors.password = "Password must be at least 6 characters long";
    }

    // Role validation
    if (!values.role) {
      formIsValid = false;
      errors.role = "Role is required";
    }

    setErrors(errors);
    return formIsValid;
  };

  return (
    <div>
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="bg-white p-3 rounded w-50 border">
          <h2>Add User</h2>
          {message && <div className="alert alert-success">{message}</div>}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email">
                <strong>Email</strong>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={values.email}
                onChange={(e) =>
                  setValues({ ...values, email: e.target.value })
                }
                className={`form-control rounded-0 ${
                  errors.email ? "is-invalid" : ""
                }`}
                required
              />
              {errors.email && (
                <div className="invalid-feedback">{errors.email}</div>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="password">
                <strong>Password</strong>
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={values.password}
                onChange={(e) =>
                  setValues({ ...values, password: e.target.value })
                }
                className={`form-control rounded-0 ${
                  errors.password ? "is-invalid" : ""
                }`}
                required
              />
              {errors.password && (
                <div className="invalid-feedback">{errors.password}</div>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="role">
                <strong>Role</strong>
              </label>
              <select
                id="role"
                name="role"
                value={values.role}
                onChange={(e) => setValues({ ...values, role: e.target.value })}
                className={`form-control rounded-0 ${
                  errors.role ? "is-invalid" : ""
                }`}
                required
              >
                <option value="">Select Role</option>
                <option value="student">student</option>
                <option value="instructor">instructor</option>
                <option value="admin">admin</option>
              </select>
              {errors.role && (
                <div className="invalid-feedback">{errors.role}</div>
              )}
            </div>
            <button type="submit" className="btn btn-success w-100 rounded-0">
              Add User
            </button>
          </form>
        </div>
      </div>
      <Sidebar />
    </div>
  );
}

export default Register;
