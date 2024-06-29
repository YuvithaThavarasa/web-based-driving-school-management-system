import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "../Layouts/Footer";

function Fleet() {
  const [fleet, setFleet] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/admin/fleet")
      .then((res) => {
        console.log("Fetched fleet:", res.data);
        setFleet(res.data);
      })
      .catch((err) => console.error("Error fetching fleet:", err));
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/admin/fleet/remove/${id}`);
      setFleet(fleet.filter((vehicle) => vehicle.ID !== id));
      toast.success("Vehicle deleted successfully!");
    } catch (err) {
      console.error("Error deleting vehicle:", err);
      toast.error("Error deleting vehicle.");
    }
  };

  const containerStyle = {
    display: "flex",
  };

  const contentStyle = {
    flex: 1,
    padding: "20px",
  };

  const innerContentStyle = {
    display: "flex",
    height: "100vh",
    justifyContent: "center",
    backgroundColor: "white",
  };

  const tableContainerStyle = {
    width: "70%",
    backgroundColor: "white",
    borderRadius: "5px",
    padding: "20px",
  };

  return (
    <div>
      <div style={containerStyle}>
        <div>
          <Sidebar />
        </div>
        <div style={contentStyle}>
          <div style={innerContentStyle}>
            <div style={tableContainerStyle}>
              <div className="justify-content-between mb-3">
                <h2>Fleet Management</h2>
                <Link to="/admin/fleet/add" className="btn btn-success">
                  Add New Vehicle
                </Link>
              </div>
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Vehicle Type</th>
                    <th>Number Plate</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {fleet.map((vehicle) => (
                    <tr key={vehicle.ID}>
                      <td>{vehicle.ID}</td>
                      <td>{vehicle.name}</td>
                      <td>{vehicle.vehicleType}</td>
                      <td>{vehicle.numberPlate}</td>
                      <td>
                        <Link
                          to={`/admin/fleet/${vehicle.ID}`}
                          className="btn btn-primary"
                        >
                          Update
                        </Link>
                        <button
                          onClick={() => handleDelete(vehicle.ID)}
                          className="btn btn-danger ms-2"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
      <Footer />
    </div>
  );
}

export default Fleet;
