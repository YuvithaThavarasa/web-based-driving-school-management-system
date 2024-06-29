import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function FleetUpdate() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    vehicleType: "",
    numberPlate: "",
  });

  useEffect(() => {
    axios
      .get(`http://localhost:5000/admin/fleet/${id}`)
      .then((res) => {
        setFormData(res.data);
      })
      .catch((err) => {
        console.error("Error fetching vehicle details:", err);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/admin/fleet/${id}`, formData)
      .then(() => {
        navigate("/admin/fleet");
      })
      .catch((err) => {
        console.error("Error updating vehicle:", err);
      });
  };

  return (
    <div className="container mt-5">
      <h2>Update Vehicle Details</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="form-control"
            style={{ color: "gray" }}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Vehicle Type</label>
          <input
            type="text"
            name="vehicleType"
            value={formData.vehicleType}
            onChange={handleChange}
            className="form-control"
            style={{ color: "gray" }}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Number Plate</label>
          <input
            type="text"
            name="numberPlate"
            value={formData.numberPlate}
            onChange={handleChange}
            className="form-control"
            style={{ color: "gray" }}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Update
        </button>
      </form>
    </div>
  );
}

export default FleetUpdate;
