// // StudentProfile.js

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import StuSidebar from "./StuSidebar";

// function StudentProfile() {
//   const [studentProfile, setStudentProfile] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [editMode, setEditMode] = useState(false);

//   useEffect(() => {
//     // Fetch student profile data from the backend
//     axios
//       .get("http://localhost:5000/admin/registered-students/${studentId}")
//       .then((res) => {
//         console.log("Fetched student profile:", res.data);
//         setStudentProfile(res.data);
//         setIsLoading(false);
//       })
//       .catch((err) => {
//         console.error("Error fetching student profile:", err);
//         setIsLoading(false);
//       });
//   }, []);

//   const handleEditClick = () => {
//     setEditMode(true);
//   };

//   const handleSaveClick = () => {
//     // Update student profile data in the backend
//     axios
//       .put("http://localhost:5000/admin/registered-students", studentProfile)
//       .then((res) => {
//         console.log("Profile updated successfully:", res.data);
//         setEditMode(false);
//       })
//       .catch((err) => {
//         console.error("Error updating profile:", err);
//       });
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setStudentProfile({
//       ...studentProfile,
//       [name]: value,
//     });
//   };

//   if (isLoading) {
//     return <p>Loading...</p>;
//   }

//   return (
//     <div>
//       <StuSidebar />
//       <div className="container mt-4">
//         <h1>My Profile</h1>
//         {studentProfile && (
//           <div>
//             <div className="form-group">
//               <label>First Name:</label>
//               {!editMode ? (
//                 <p>{studentProfile.firstName}</p>
//               ) : (
//                 <input
//                   type="text"
//                   className="form-control"
//                   name="firstName"
//                   value={studentProfile.firstName}
//                   onChange={handleChange}
//                 />
//               )}
//             </div>
//             <div className="form-group">
//               <label>Last Name:</label>
//               {!editMode ? (
//                 <p>{studentProfile.lastName}</p>
//               ) : (
//                 <input
//                   type="text"
//                   className="form-control"
//                   name="lastName"
//                   value={studentProfile.lastName}
//                   onChange={handleChange}
//                 />
//               )}
//             </div>
//             <div className="form-group">
//               <label>Email:</label>
//               {!editMode ? (
//                 <p>{studentProfile.email}</p>
//               ) : (
//                 <input
//                   type="email"
//                   className="form-control"
//                   name="email"
//                   value={studentProfile.email}
//                   onChange={handleChange}
//                 />
//               )}
//             </div>
//             <div className="form-group">
//               <label>Phone Number:</label>
//               {!editMode ? (
//                 <p>{studentProfile.phoneNumber}</p>
//               ) : (
//                 <input
//                   type="text"
//                   className="form-control"
//                   name="phoneNumber"
//                   value={studentProfile.phoneNumber}
//                   onChange={handleChange}
//                 />
//               )}
//             </div>
//             <div className="form-group">
//               <label>Address Line 1:</label>
//               {!editMode ? (
//                 <p>{studentProfile.addressLine1}</p>
//               ) : (
//                 <input
//                   type="text"
//                   className="form-control"
//                   name="addressLine1"
//                   value={studentProfile.addressLine1}
//                   onChange={handleChange}
//                 />
//               )}
//             </div>
//             <div className="form-group">
//               <label>Address Line 2:</label>
//               {!editMode ? (
//                 <p>{studentProfile.addressLine2}</p>
//               ) : (
//                 <input
//                   type="text"
//                   className="form-control"
//                   name="addressLine2"
//                   value={studentProfile.addressLine2}
//                   onChange={handleChange}
//                 />
//               )}
//             </div>
//             <div className="form-group">
//               <label>Address Line 3:</label>
//               {!editMode ? (
//                 <p>{studentProfile.addressLine3}</p>
//               ) : (
//                 <input
//                   type="text"
//                   className="form-control"
//                   name="addressLine3"
//                   value={studentProfile.addressLine3}
//                   onChange={handleChange}
//                 />
//               )}
//             </div>
//           </div>
//         )}
//         {!editMode ? (
//           <button className="btn btn-primary" onClick={handleEditClick}>
//             Edit Profile
//           </button>
//         ) : (
//           <button className="btn btn-success" onClick={handleSaveClick}>
//             Save Changes
//           </button>
//         )}
//       </div>
//     </div>
//   );
// }

// export default StudentProfile;
