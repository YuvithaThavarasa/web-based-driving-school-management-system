// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import Sidebar from "./Sidebar";

// function RegStudent() {
//   const [registeredStudents, setRegisteredStudents] = useState([]);

//   useEffect(() => {
//     axios
//       .get("http://localhost:5000/admin/registered-students")
//       .then((res) => {
//         console.log("Fetched registered students:", res.data);
//         setRegisteredStudents(res.data);
//       })
//       .catch((err) =>
//         console.error("Error fetching registered students:", err)
//       );
//   }, []);

//   const formatToSriLankanDate = (isoString) => {
//     const date = new Date(isoString);
//     const sriLankanOffset = 330; // Sri Lankan timezone offset in minutes (5.5 hours * 60 minutes)
//     const utcOffset = date.getTimezoneOffset(); // Local timezone offset in minutes
//     const totalOffset = sriLankanOffset - utcOffset; // Difference between Sri Lankan and local timezone
//     const sriLankanDate = new Date(date.getTime() + totalOffset * 60 * 1000);
//     return sriLankanDate.toLocaleDateString("en-GB"); // en-GB to get date in DD/MM/YYYY format
//   };

//   const formatDate = (isoString) => {
//     return formatToSriLankanDate(isoString);
//   };

//   const containerStyle = {
//     display: "flex",
//   };

//   const contentStyle = {
//     flex: 1,
//     padding: "20px",
//   };

//   const innerContentStyle = {
//     display: "flex",
//     height: "100vh",
//     justifyContent: "center",
//     backgroundColor: "white",
//   };
//   const sidebarWidth = 250; // Width of the sidebar

//   const tableContainerStyle = {
//     width: `calc(100% - ${sidebarWidth}px)`, // Adjusted width to accommodate sidebar
//     marginLeft: `${sidebarWidth}px`, // Push the table to the right to avoid overlap with sidebar
//     backgroundColor: "white",
//     borderRadius: "5px",
//     padding: "20px",
//     overflowX: "auto", // Add horizontal scroll for smaller screens
//   };

//   return (
//     <div style={containerStyle}>
//       <div>
//         <Sidebar />
//       </div>
//       <div style={contentStyle}>
//         <div style={innerContentStyle}>
//           <div style={tableContainerStyle}>
//             <h1>Registered students</h1>
//             <br />
//             <table className="table table-bordered vh-90 align-items-top">
//               <thead>
//                 <tr>
//                   <th>ID</th>
//                   <th>First Name</th>
//                   <th>Last Name</th>
//                   <th>Date of Birth</th>
//                   <th>Address Line 1</th>
//                   <th>Address Line 2</th>
//                   <th>Address Line 3</th>
//                   <th>Email</th>
//                   <th>Phone Number</th>
//                   <th>NIC Number</th>
//                   <th>Gender</th>
//                   <th>Vehicles</th>
//                   <th>Amount Paid</th>
//                   <th>Days</th>
//                   <th>Medical Certificate</th>
//                   <th>NIC Copy</th>
//                   <th>Registered Date</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {registeredStudents.map((student) => (
//                   <tr key={student.id}>
//                     <td>{student.id}</td>
//                     <td>{student.firstName}</td>
//                     <td>{student.lastName}</td>
//                     <td>{formatDate(student.dob)}</td>
//                     <td>{student.addressLine1}</td>
//                     <td>{student.addressLine2}</td>
//                     <td>{student.addressLine3}</td>
//                     <td>{student.email}</td>
//                     <td>{student.phoneNumber}</td>
//                     <td>{student.nicNumber}</td>
//                     <td>{student.gender}</td>
//                     <td>{student.vehicles}</td>
//                     <td>{student.amountPaid}</td>
//                     <td>{student.days}</td>
//                     <td>
//                       {student.medicalCertificate ? (
//                         <a
//                           href={`http://localhost:5000/uploads/${student.medicalCertificate}`}
//                           target="_blank"
//                           rel="noopener noreferrer"
//                           className="btn btn-link"
//                         >
//                           View PDF
//                         </a>
//                       ) : (
//                         "N/A"
//                       )}
//                     </td>
//                     <td>
//                       {student.nicCopy ? (
//                         <a
//                           href={`http://localhost:5000/uploads/${student.nicCopy}`}
//                           target="_blank"
//                           rel="noopener noreferrer"
//                           className="btn btn-link"
//                         >
//                           View PDF
//                         </a>
//                       ) : (
//                         "N/A"
//                       )}
//                     </td>
//                     <td>{formatDate(student.registered_date)}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default RegStudent;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";

function RegStudent() {
  const [registeredStudents, setRegisteredStudents] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/admin/registered-students")
      .then((res) => {
        console.log("Fetched registered students:", res.data);
        setRegisteredStudents(res.data);
      })
      .catch((err) =>
        console.error("Error fetching registered students:", err)
      );
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
            <h1>Registered students</h1>
            <br />
            <table className="table table-bordered vh-90 align-items-top">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Date of Birth</th>
                  <th>Address Line 1</th>
                  <th>Address Line 2</th>
                  <th>Address Line 3</th>
                  <th>Email</th>
                  <th>Phone Number</th>
                  <th>NIC Number</th>
                  <th>Gender</th>
                  <th>Vehicles</th>
                  <th>Amount Paid</th>
                  <th>Days</th>
                  <th>Medical Certificate</th>
                  <th>NIC Copy</th>
                  <th>Registered Date</th>
                </tr>
              </thead>
              <tbody>
                {registeredStudents.map((student) => (
                  <tr key={student.id}>
                    <td>{student.id}</td>
                    <td>{student.firstName}</td>
                    <td>{student.lastName}</td>
                    <td>{formatDate(student.dob)}</td>
                    <td>{student.addressLine1}</td>
                    <td>{student.addressLine2}</td>
                    <td>{student.addressLine3}</td>
                    <td>{student.email}</td>
                    <td>{student.phoneNumber}</td>
                    <td>{student.nicNumber}</td>
                    <td>{student.gender}</td>
                    <td>{student.vehicles}</td>
                    <td>{student.amountPaid}</td>
                    <td>{student.days}</td>
                    <td>
                      {student.medicalCertificate ? (
                        <a
                          href={`http://localhost:5000/uploads/${student.medicalCertificate}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-link"
                        >
                          View PDF
                        </a>
                      ) : (
                        "N/A"
                      )}
                    </td>
                    <td>
                      {student.nicCopy ? (
                        <a
                          href={`http://localhost:5000/uploads/${student.nicCopy}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-link"
                        >
                          View PDF
                        </a>
                      ) : (
                        "N/A"
                      )}
                    </td>
                    <td>{formatDate(student.registered_date)}</td>
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

export default RegStudent;
