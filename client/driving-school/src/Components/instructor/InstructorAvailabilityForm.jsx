import React, { useState, useEffect } from "react";
import axios from "axios";
import InsSidebar from "./InsSidebar";

function InstructorAvailabilityForm() {
  const [formData, setFormData] = useState({
    instructor_id: "", // This will be set after fetching the instructor ID
    day_of_week: "",
    start_time: "",
    end_time: "",
  });

  useEffect(() => {
    // Assuming the instructor ID is stored in local storage after login
    const instructorId = localStorage.getItem("instructor_id");
    if (instructorId) {
      setFormData((prevData) => ({
        ...prevData,
        instructor_id: instructorId,
      }));
    } else {
      // Handle the case where the instructor ID is not available
      console.error("Instructor ID not found in local storage");
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/instructor/availability", formData)
      .then((res) => {
        console.log("Instructor availability added:", res.data);
        // Optionally, you can clear the form after successful submission
        setFormData({
          instructor_id: formData.instructor_id,
          day_of_week: "",
          start_time: "",
          end_time: "",
        });
      })
      .catch((err) =>
        console.error("Error adding instructor availability:", err)
      );
  };

  return (
    <div>
      <InsSidebar />
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh", backgroundColor: "#f8f9fa" }}
      >
        <div
          className="card"
          style={{
            width: "100%",
            maxWidth: "500px",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          <h3 className="text-center mb-4" style={{ color: "#333" }}>
            Add Instructor Availability
          </h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="day_of_week" style={{ fontWeight: "bold" }}>
                Day of Week:
              </label>
              <select
                className="form-control"
                name="day_of_week"
                id="day_of_week"
                value={formData.day_of_week}
                onChange={handleChange}
              >
                <option value="">Select Day</option>
                <option value="Monday">Monday</option>
                <option value="Tuesday">Tuesday</option>
                <option value="Wednesday">Wednesday</option>
                <option value="Thursday">Thursday</option>
                <option value="Friday">Friday</option>
                <option value="Saturday">Saturday</option>
                <option value="Sunday">Sunday</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="start_time" style={{ fontWeight: "bold" }}>
                Start Time:
              </label>
              <input
                type="time"
                className="form-control"
                name="start_time"
                id="start_time"
                value={formData.start_time}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="end_time" style={{ fontWeight: "bold" }}>
                End Time:
              </label>
              <input
                type="time"
                className="form-control"
                name="end_time"
                id="end_time"
                value={formData.end_time}
                onChange={handleChange}
              />
            </div>
            <button type="submit" className="btn btn-primary btn-block">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default InstructorAvailabilityForm;
