import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "../Layouts/Footer";

function Pricing() {
  const [pricingData, setPricingData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/admin/pricing")
      .then((res) => {
        setPricingData(res.data);
      })
      .catch((err) => {
        console.error("Error fetching pricing details:", err);
      });
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5000/admin/pricing/${id}`)
      .then(() => {
        setPricingData(pricingData.filter((pricing) => pricing.id !== id));
        toast.success("Pricing detail deleted successfully!");
      })
      .catch((err) => {
        console.error("Error deleting pricing:", err);
        toast.error("Error deleting pricing detail.");
      });
  };

  return (
    <div className="container mt-5">
      <Sidebar />
      <Footer />

      <h2>Pricing Details</h2>
      <Link to="/admin/pricing/add" className="btn btn-success mb-3">
        Add +
      </Link>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Vehicle type</th>
            <th>Fee</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {pricingData.map((pricing) => (
            <tr key={pricing.id}>
              <td>{pricing.vehicleType + " "} </td>
              <td>Rs.{pricing.fee.toFixed(2)}</td>
              <td>
                <Link
                  to={`/admin/pricing/${pricing.id}`}
                  className="btn btn-primary"
                >
                  Update
                </Link>
                <button
                  onClick={() => handleDelete(pricing.id)}
                  className="btn btn-danger ms-2"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ToastContainer />
    </div>
  );
}

export default Pricing;
