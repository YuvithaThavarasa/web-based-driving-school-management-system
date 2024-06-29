// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useParams } from "react-router-dom";

// function StudentDetails() {
//   const { id } = useParams();
//   const [student, setStudent] = useState(null);
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     dob: "",
//     addressLine1: "",
//     addressLine2: "",
//     addressLine3: "",
//     email: "",
//     phoneNumber: "",
//   });

//   useEffect(() => {
//     axios
//       .get(`http://localhost:5000/admin/student/${id}`)
//       .then((res) => {
//         setStudent(res.data);
//         setFormData(res.data);
//       })
//       .catch((err) => console.error("Error fetching student:", err));
//   }, [id]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     axios
//       .put(`http://localhost:5000/admin/student/${id}`, formData)
//       .then((res) => {
//         console.log("Student details updated:", res.data);
//         alert("Details updated successfully!");
//       })
//       .catch((err) => {
//         console.error("Error updating student:", err);
//         alert("Error updating details");
//       });
//   };

//   if (!student) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="container mt-5">
//       <h2>Edit Your Details</h2>
//       <form onSubmit={handleSubmit}>
//         <div className="mb-3">
//           <label htmlFor="firstName" className="form-label">
//             First Name
//           </label>
//           <input
//             type="text"
//             id="firstName"
//             name="firstName"
//             value={formData.firstName}
//             onChange={handleChange}
//             className="form-control"
//             required
//           />
//         </div>
//         <div className="mb-3">
//           <label htmlFor="lastName" className="form-label">
//             Last Name
//           </label>
//           <input
//             type="text"
//             id="lastName"
//             name="lastName"
//             value={formData.lastName}
//             onChange={handleChange}
//             className="form-control"
//             required
//           />
//         </div>
//         <div className="mb-3">
//           <label htmlFor="dob" className="form-label">
//             Date of Birth
//           </label>
//           <input
//             type="date"
//             id="dob"
//             name="dob"
//             value={formData.dob}
//             onChange={handleChange}
//             className="form-control"
//             required
//           />
//         </div>
//         <div className="mb-3">
//           <label htmlFor="addressLine1" className="form-label">
//             Address Line 1
//           </label>
//           <input
//             type="text"
//             id="addressLine1"
//             name="addressLine1"
//             value={formData.addressLine1}
//             onChange={handleChange}
//             className="form-control"
//             required
//           />
//         </div>
//         <div className="mb-3">
//           <label htmlFor="addressLine2" className="form-label">
//             Address Line 2
//           </label>
//           <input
//             type="text"
//             id="addressLine2"
//             name="addressLine2"
//             value={formData.addressLine2}
//             onChange={handleChange}
//             className="form-control"
//           />
//         </div>
//         <div className="mb-3">
//           <label htmlFor="addressLine3" className="form-label">
//             Address Line 3
//           </label>
//           <input
//             type="text"
//             id="addressLine3"
//             name="addressLine3"
//             value={formData.addressLine3}
//             onChange={handleChange}
//             className="form-control"
//           />
//         </div>
//         <div className="mb-3">
//           <label htmlFor="email" className="form-label">
//             Email
//           </label>
//           <input
//             type="email"
//             id="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             className="form-control"
//             required
//           />
//         </div>
//         <div className="mb-3">
//           <label htmlFor="phoneNumber" className="form-label">
//             Phone Number
//           </label>
//           <input
//             type="text"
//             id="phoneNumber"
//             name="phoneNumber"
//             value={formData.phoneNumber}
//             onChange={handleChange}
//             className="form-control"
//             required
//           />
//         </div>
//         <button type="submit" className="btn btn-primary">
//           Update Details
//         </button>
//       </form>
//     </div>
//   );
// }

// export default StudentDetails;
