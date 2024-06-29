import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Dashboard.css";
import Sidebar from "./Sidebar";
import Footer from "../Layouts/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUsers,
  faChalkboardTeacher,
  faUserPlus,
  faCar,
} from "@fortawesome/free-solid-svg-icons";
import Student from "./Student";

function Dashboard() {
  const [totalStudents, setTotalStudents] = useState(0);
  const [totalInstructors, setTotalInstructors] = useState(0);
  const [todayAdmissions, setTodayAdmissions] = useState(0);
  const [totalVehicles, setTotalVehicles] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem("token");

    // Fetch total students
    axios
      .get("http://localhost:5000/admin/total-students", {
        headers: { "x-access-token": token },
      })
      .then((res) => {
        setTotalStudents(res.data.totalStudents);
      })
      .catch((err) => {
        console.error("Error fetching total students:", err);
      });

    // Fetch total instructors
    axios
      .get("http://localhost:5000/admin/total-instructors", {
        headers: { "x-access-token": token },
      })
      .then((res) => {
        setTotalInstructors(res.data.totalInstructors);
      })
      .catch((err) => {
        console.error("Error fetching total instructors:", err);
      });

    // Fetch today's admissions
    axios
      .get("http://localhost:5000/admin/today-admissions", {
        headers: { "x-access-token": token },
      })
      .then((res) => {
        setTodayAdmissions(res.data.todayAdmissions);
      })
      .catch((err) => {
        console.error("Error fetching today's admissions:", err);
      });

    // // Fetch total vehicles
    // axios
    //   .get("http://localhost:5000/admin/fleet", {
    //     headers: { "x-access-token": token },
    //   })
    //   .then((res) => {
    //     setTotalVehicles(res.data.totalVehicles);
    //   })
    //   .catch((err) => {
    //     console.error("Error fetching total vehicles:", err);
    //   });
  }, []);

  return (
    <div>
      <Sidebar />
      <div className="container">
        <h1 className="mt-3 mb-4">Admin Dashboard</h1>
        <div className="row">
          <div className="col-md-4">
            <div className="card bg-primary text-white">
              <div className="card-body">
                <h5 className="card-title">
                  <FontAwesomeIcon icon={faUsers} /> Total Students
                </h5>
                <p className="card-text">{totalStudents}</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card bg-secondary text-white">
              <div className="card-body">
                <h5 className="card-title">
                  <FontAwesomeIcon icon={faChalkboardTeacher} /> Total
                  Instructors
                </h5>
                <p className="card-text">{totalInstructors}</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card bg-dark text-white">
              <div className="card-body">
                <h5 className="card-title">
                  <FontAwesomeIcon icon={faUserPlus} /> Today's Admissions
                </h5>
                <p className="card-text">{todayAdmissions}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Student />

      <Footer />
    </div>
  );
}

export default Dashboard;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import "./Dashboard.css";
// import Sidebar from "./Sidebar";
// import Footer from "../Layouts/Footer";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faUsers,
//   faChalkboardTeacher,
//   faUserPlus,
//   faCar,
// } from "@fortawesome/free-solid-svg-icons";

// function Dashboard() {
//   const [totalStudents, setTotalStudents] = useState(0);
//   const [totalInstructors, setTotalInstructors] = useState(0);
//   const [todayAdmissions, setTodayAdmissions] = useState(0);
//   const [totalVehicles, setTotalVehicles] = useState(0);
//   const [registeredStudents, setRegisteredStudents] = useState([]);

//   useEffect(() => {
//     const token = localStorage.getItem("token");

//     // Fetch total students
//     axios
//       .get("http://localhost:5000/admin/total-students", {
//         headers: { "x-access-token": token },
//       })
//       .then((res) => {
//         setTotalStudents(res.data.totalStudents);
//       })
//       .catch((err) => {
//         console.error("Error fetching total students:", err);
//       });

//     // Fetch total instructors
//     axios
//       .get("http://localhost:5000/admin/total-instructors", {
//         headers: { "x-access-token": token },
//       })
//       .then((res) => {
//         setTotalInstructors(res.data.totalInstructors);
//       })
//       .catch((err) => {
//         console.error("Error fetching total instructors:", err);
//       });

//     // Fetch today's admissions
//     axios
//       .get("http://localhost:5000/admin/today-admissions", {
//         headers: { "x-access-token": token },
//       })
//       .then((res) => {
//         setTodayAdmissions(res.data.todayAdmissions);
//         setRegisteredStudents(res.data.admissionsDetails); // Set the admissions details array
//       })
//       .catch((err) => {
//         console.error("Error fetching today's admissions:", err);
//       });

//     // // Fetch total vehicles
//     // axios
//     //   .get("http://localhost:5000/admin/fleet", {
//     //     headers: { "x-access-token": token },
//     //   })
//     //   .then((res) => {
//     //     setTotalVehicles(res.data.totalVehicles);
//     //   })
//     //   .catch((err) => {
//     //     console.error("Error fetching total vehicles:", err);
//     //   });
//   }, []);

//   return (
//     <div>
//       <Sidebar />
//       <div className="container">
//         <div className="d-flex justify-content-end mt-4 mb-4">
//           <Link to="/admin/student" className="btn btn-primary">
//             See Admission Requests
//           </Link>
//         </div>
//         <h1 className="mt-3 mb-4">Admin Dashboard</h1>
//         <div className="row">
//           <div className="col-md-4">
//             <div className="card bg-primary text-white">
//               <div className="card-body">
//                 <h5 className="card-title">
//                   <FontAwesomeIcon icon={faUsers} /> Total Students
//                 </h5>
//                 <p className="card-text">{totalStudents}</p>
//               </div>
//             </div>
//           </div>
//           <div className="col-md-4">
//             <div className="card bg-secondary text-white">
//               <div className="card-body">
//                 <h5 className="card-title">
//                   <FontAwesomeIcon icon={faChalkboardTeacher} /> Total
//                   Instructors
//                 </h5>
//                 <p className="card-text">{totalInstructors}</p>
//               </div>
//             </div>
//           </div>
//           <div className="col-md-4">
//             <div className="card bg-dark text-white">
//               <div className="card-body">
//                 <h5 className="card-title">
//                   <FontAwesomeIcon icon={faUserPlus} /> Today's Admissions
//                 </h5>
//                 <p className="card-text">{todayAdmissions}</p>
//               </div>
//             </div>
//           </div>
//           {/* <div className="col-md-4">
//             <div className="card bg-info text-white">
//               <div className="card-body">
//                 <h5 className="card-title">
//                   <FontAwesomeIcon icon={faCar} /> Total Vehicles
//                 </h5>
//                 <p className="card-text">{totalVehicles}</p>
//               </div>
//             </div>
//           </div> */}
//         </div>
//         {/* Display table for today's admissions */}
//         <div className="mt-5">
//           <h2>Today's Admissions Details</h2>
//           <table className="table table-bordered">
//             <thead>
//               <tr>
//                 <th>ID</th>
//                 <th>First Name</th>
//                 <th>Last Name</th>
//                 <th>Date of Birth</th>
//                 <th>Email</th>
//                 <th>Phone Number</th>
//                 <th>NIC Number</th>
//                 <th>Gender</th>
//               </tr>
//             </thead>
//             <tbody>
//               {registeredStudents && registeredStudents.map((student) => (
//                 <tr key={student.id}>
//                   <td>{student.id}</td>
//                   <td>{student.firstName}</td>
//                   <td>{student.lastName}</td>
//                   <td>{student.dob}</td>
//                   <td>{student.email}</td>
//                   <td>{student.phoneNumber}</td>
//                   <td>{student.nicNumber}</td>
//                   <td>{student.gender}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// }

// export default Dashboard;
