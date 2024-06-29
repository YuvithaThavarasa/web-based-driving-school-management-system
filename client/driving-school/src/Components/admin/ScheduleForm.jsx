// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Sidebar from "./Sidebar";

// function ScheduleForm({ onSubmit }) {
//   const [date, setDate] = useState("");
//   const [startTime, setStartTime] = useState("");
//   const [endTime, setEndTime] = useState("");
//   const [student, setStudent] = useState("");
//   const [course, setCourse] = useState("");
//   const [instructor, setInstructor] = useState("");
//   const [vehicle, setVehicle] = useState("");
//   const [vehicleTypes, setVehicleTypes] = useState([]);

//   useEffect(() => {
//     // Fetch vehicle types from the server
//     const fetchVehicleTypes = async () => {
//       try {
//         const response = await axios.get("http://localhost:5000/fleet");
//         setVehicleTypes(response.data);
//       } catch (error) {
//         console.error("Error fetching vehicle types:", error);
//       }
//     };

//     fetchVehicleTypes();
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const formData = {
//       date,
//       startTime,
//       endTime,
//       student,
//       course,
//       instructor,
//       vehicle,
//     };

//     try {
//       const response = await axios.post(
//         "http://localhost:5000/admin/schedule",
//         formData
//       );
//       console.log("Session added:", response.data);
//       onSubmit(); // Call the onSubmit callback if provided

//       // Optionally clear the form fields here
//       setDate("");
//       setStartTime("");
//       setEndTime("");
//       setStudent("");
//       setCourse("");
//       setInstructor("");
//       setVehicle("");
//     } catch (error) {
//       console.error("Error creating session:", error);
//     }
//   };

//   return (
//     <div>
//       <Sidebar />
//       <div className="d-flex vh-100 bg-white justify-content-center align-items-center">
//         <form onSubmit={handleSubmit}>
//           <div>
//             <label>Date:</label>
//             <input
//               type="date"
//               value={date}
//               onChange={(e) => setDate(e.target.value)}
//             />
//           </div>
//           <div>
//             <label>Start time:</label>
//             <input
//               type="time"
//               value={startTime}
//               onChange={(e) => setStartTime(e.target.value)}
//             />
//           </div>

//           <div>
//             <label>End time:</label>
//             <input
//               type="time"
//               value={endTime}
//               onChange={(e) => setEndTime(e.target.value)}
//             />
//           </div>
//           <div>
//             <label>Student:</label>
//             <input
//               type="text"
//               value={student}
//               onChange={(e) => setStudent(e.target.value)}
//             />
//           </div>
//           <div>
//             <label>Course:</label>
//             <input
//               type="text"
//               value={course}
//               onChange={(e) => setCourse(e.target.value)}
//             />
//           </div>
//           <div>
//             <label>Instructor:</label>
//             <input
//               type="text"
//               value={instructor}
//               onChange={(e) => setInstructor(e.target.value)}
//             />
//           </div>
//           <div>
//             <label>Vehicle:</label>
//             <select
//               value={vehicle}
//               onChange={(e) => setVehicle(e.target.value)}
//             >
//               <option value="">Select Vehicle</option>
//               {vehicleTypes.map((fleet, ID) => (
//                 <option key={ID} value={fleet.vehicleType}>
//                   {fleet.vehicleType}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <button type="submit">Create Class</button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default ScheduleForm;
