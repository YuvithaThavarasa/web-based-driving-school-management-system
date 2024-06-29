import React from "react";
import StuSidebar from "./StuSidebar";
import Footer from "../Layouts/Footer";

function StuDashboard() {
  return (
    <div>
      <StuSidebar />
      <Footer />

      <div className="container mt-5">
        <h1>Student Dashboard</h1>
        <p>Welcome to the student dashboard!</p>
        {/* Add more student-specific content here */}
      </div>
    </div>
  );
}

export default StuDashboard;
