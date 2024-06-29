import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";

function Booking() {
  const [bookingList, setBookingList] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/admin/booking")
      .then((res) => {
        console.log("Fetched bookings:", res.data);
        setBookingList(res.data);
      })
      .catch((err) => console.error("Error fetching bookingss:", err));
  }, []);

  const formatToSriLankanDate = (isoString) => {
    const date = new Date(isoString);
    const sriLankanOffset = 330; // Sri Lankan timezone offset in minutes (5.5 hours * 60 minutes)
    const utcOffset = date.getTimezoneOffset(); // Local timezone offset in minutes
    const totalOffset = sriLankanOffset - utcOffset; // Difference between Sri Lankan and local timezone
    const sriLankanDate = new Date(date.getTime() + totalOffset * 60 * 1000);
    return sriLankanDate.toLocaleDateString("en-GB"); // en-GB to get date in DD/MM/YYYY format
  };

  const formatDate = (isoString) => {
    return formatToSriLankanDate(isoString);
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
  const sidebarWidth = 250; // Width of the sidebar

  const tableContainerStyle = {
    width: `calc(100% - ${sidebarWidth}px)`, // Adjusted width to accommodate sidebar
    marginLeft: `${sidebarWidth}px`, // Push the table to the right to avoid overlap with sidebar
    backgroundColor: "white",
    borderRadius: "5px",
    padding: "20px",
    overflowX: "auto", // Add horizontal scroll for smaller screens
  };

  return (
    <div style={containerStyle}>
      <div>
        <Sidebar />
      </div>
      <div style={contentStyle}>
        <div style={innerContentStyle}>
          <div style={tableContainerStyle}>
            <h1>Bookings</h1>
            <br />
            <table className="table table-bordered vh-90 align-items-top">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Student name</th>

                  <th>Session name</th>
                  <th>Session date</th>
                  <th>Start time</th>
                  <th>End time</th>

                  <th>Instructor name</th>
                  <th>Booking date</th>
                </tr>
              </thead>
              <tbody>
                {bookingList.map((booking) => (
                  <tr key={booking.id}>
                    <td>{booking.id}</td>
                    <td>{`${booking.student_firstName} ${booking.student_lastName}`}</td>
                    <td>{booking.session_name}</td>
                    <td>{formatDate(booking.session_date)}</td>

                    <td>{booking.start_time}</td>
                    <td>{booking.end_time}</td>

                    <td>{`${booking.instructor_firstName} ${booking.instructor_lastName}`}</td>

                    <td>{formatDate(booking.booking_date)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Booking;
