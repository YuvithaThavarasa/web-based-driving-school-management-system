// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";

// function InstructorUpdate() {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     dob: "",
//     email: "",
//     phoneNumber: "",
//     nicNumber: "",
//     gender: "",
//     vehicles: [],
//   });

//   useEffect(() => {
//     // Fetch instructor details by ID and set the form data
//     axios
//       .get(`http://localhost:5000/admin/instructor/${id}`)
//       .then((res) => {
//         setFormData(res.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching instructor:", error);
//       });
//   }, [id]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleCheckboxChange = (e) => {
//     const { name, checked } = e.target;
//     setFormData((prevFormData) => ({
//       ...prevFormData,
//       vehicles: checked
//         ? [...prevFormData.vehicles, name]
//         : prevFormData.vehicles.filter((vehicle) => vehicle !== name),
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.put(`http://localhost:5000/admin/instructor/${id}`, formData);
//       console.log("Instructor updated successfully");
//       navigate("/admin/instructor");
//     } catch (error) {
//       console.error("Error updating instructor:", error);
//     }
//   };

//   return (
//     <div className="container-sm w-50">
//       <br />
//       <form onSubmit={handleSubmit} className="p-4 border rounded">
//         {/* Other form fields */}
//         {/* Similar to InstructorReg form but with pre-filled data */}
//         <button type="submit" className="btn btn-primary">
//           Update
//         </button>
//       </form>
//     </div>
//   );
// }

// export default InstructorUpdate;
