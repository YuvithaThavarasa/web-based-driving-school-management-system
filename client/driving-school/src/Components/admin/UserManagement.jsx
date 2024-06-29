// // UserManagement.js

// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const UserManagement = () => {
//   const [users, setUsers] = useState([]);

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   const fetchUsers = async () => {
//     try {
//       const response = await axios.get("/admin/login");
//       setUsers(response.data);
//     } catch (error) {
//       console.error("Error fetching users:", error);
//     }
//   };

//   const deactivateUser = async (id) => {
//     try {
//       await axios.post(`/admin/login/deactivate/${id}`);
//       fetchUsers();
//     } catch (error) {
//       console.error("Error deactivating user:", error);
//     }
//   };

//   const activateUser = async (id) => {
//     try {
//       await axios.post(`/admin/login/activate/${id}`);
//       fetchUsers();
//     } catch (error) {
//       console.error("Error activating user:", error);
//     }
//   };

//   return (
//     <div>
//       <h2>User Management</h2>
//       <ul>
//         {users.map((login) => (
//           <li key={login.id}>
//             {login.email} - {login.role} -{" "}
//             {login.active ? "Active" : "Inactive"}
//             {login.active ? (
//               <button onClick={() => deactivateUser(login.id)}>
//                 Deactivate
//               </button>
//             ) : (
//               <button onClick={() => activateUser(login.id)}>Activate</button>
//             )}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default UserManagement;
