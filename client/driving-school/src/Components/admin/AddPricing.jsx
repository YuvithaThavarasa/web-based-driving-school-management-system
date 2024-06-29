import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddPricing() {
  const [formData, setFormData] = useState({
    vehicleType: "", // Change to vehicleType for single selection
    fee: "",
  });

  const [vehicleOptions, setVehicleOptions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/admin/vehicletypes")
      .then((res) => {
        setVehicleOptions(res.data);
      })
      .catch((err) => {
        console.error("Error fetching vehicle types:", err);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/admin/pricing/add",
        formData
      );
      console.log("Pricing added:", response.data);
      navigate("/admin/pricing");
      setFormData({ vehicleType: "", fee: "" });
    } catch (error) {
      console.error("Error adding pricing:", error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Add Pricing</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="vehicleType" className="form-label">
            Included vehicle
          </label>
          <select
            id="vehicleType"
            name="vehicleType"
            value={formData.vehicleType}
            onChange={handleChange}
            className="form-control"
            required
          >
            <option value="" disabled>
              Select a vehicle
            </option>
            {vehicleOptions.map((vehicle) => (
              <option key={vehicle.vehicleType} value={vehicle.vehicleType}>
                {vehicle.vehicleType}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="fee" className="form-label">
            Fee
          </label>
          <input
            type="number"
            id="fee"
            name="fee"
            value={formData.fee}
            onChange={handleChange}
            className="form-control"
            step="0.01"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Add Pricing
        </button>
      </form>
    </div>
  );
}

export default AddPricing;
