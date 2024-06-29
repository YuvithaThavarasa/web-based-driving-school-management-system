import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function PricingUpdate() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    vehicleType: "",
    fee: "",
  });

  useEffect(() => {
    axios
      .get(`http://localhost:5000/admin/pricing/${id}`)
      .then((res) => {
        // Assuming res.data contains the object with the vehicleType and fee
        setFormData(res.data);
      })
      .catch((err) => {
        console.error("Error fetching pricing details:", err);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/admin/pricing/${id}`, { fee: formData.fee })
      .then(() => {
        navigate("/admin/pricing");
      })
      .catch((err) => {
        console.error("Error updating pricing:", err);
      });
  };

  return (
    <div className="container mt-5">
      <h2>Update Pricing</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Vehicle Type</label>
          <input
            type="text"
            name="vehicleType"
            value={formData.vehicleType}
            onChange={handleChange}
            className="form-control"
            disabled
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Fee</label>
          <input
            type="number"
            name="fee"
            value={formData.fee}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Update
        </button>
      </form>
    </div>
  );
}

export default PricingUpdate;
