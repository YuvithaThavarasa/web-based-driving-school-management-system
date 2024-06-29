// import React, { useState, useEffect } from "react";
// import axios from "axios";

// function LearningMaterials() {
//   const [materials, setMaterials] = useState([]);

//   useEffect(() => {
//     axios
//       .get("http://localhost:5000/student/learning-materials")
//       .then((res) => {
//         console.log(res.data);
//         setMaterials(res.data);
//       })
//       .catch((err) => {
//         console.error("Error fetching learning materials:", err);
//       });
//   }, []);

//   return (
//     <div>
//       <div>
//         <div
//           style={{
//             background: "white",
//             minHeight: "100vh",
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//           }}
//         >
//           <div
//             style={{
//               maxWidth: "800px",
//               width: "100%",
//               padding: "20px",
//               borderRadius: "10px",
//               background: "##f8f9fa",
//             }}
//           >
//             <h2
//               style={{
//                 textAlign: "center",
//                 color: "#092139",
//                 marginBottom: "20px",
//               }}
//             >
//               Learning Materials
//             </h2>
//             {materials.length === 0 ? (
//               <p style={{ textAlign: "center", color: "#092139" }}>
//                 No learning materials available.
//               </p>
//             ) : (
//               <ul style={{ listStyleType: "round", padding: "0" }}>
//                 {materials.map((learning_material) => (
//                   <li
//                     key={learning_material.id}
//                     style={{
//                       marginBottom: "20px",
//                       padding: "15px",
//                       borderRadius: "5px",
//                       boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
//                       backgroundColor: "#fff",
//                     }}
//                   >
//                     <a
//                       href={`http://localhost:5000/uploads/${learning_material.filePath}`}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       style={{
//                         textDecoration: "none",
//                         color: "#092139",
//                         fontWeight: "bold",
//                       }}
//                     >
//                       View PDF
//                     </a>
//                     <p style={{ marginTop: "10px", color: "#666" }}>
//                       Description: {learning_material.description}
//                     </p>
//                   </li>
//                 ))}
//               </ul>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default LearningMaterials;

import React, { useState, useEffect } from "react";
import axios from "axios";

function LearningMaterials() {
  const [materials, setMaterials] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/student/learning-materials")
      .then((res) => {
        console.log(res.data);
        setMaterials(res.data);
      })
      .catch((err) => {
        console.error("Error fetching learning materials:", err);
      });
  }, []);

  return (
    <div
      style={{
        background: "#f0f0f0",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          maxWidth: "800px",
          width: "100%",
          padding: "20px",
          borderRadius: "10px",
          background: "#ffffff",
          boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            color: "#092139",
            marginBottom: "20px",
          }}
        >
          Learning Materials
        </h2>
        {materials.length === 0 ? (
          <p style={{ textAlign: "center", color: "#666" }}>
            No learning materials available.
          </p>
        ) : (
          <ul style={{ listStyleType: "none", padding: "0" }}>
            {materials.map((learning_material) => (
              <li
                key={learning_material.id}
                style={{
                  marginBottom: "20px",
                  padding: "15px",
                  borderRadius: "5px",
                  boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
                  backgroundColor: "#ffffff",
                }}
              >
                <a
                  href={`http://localhost:5000/uploads/${learning_material.filePath}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    textDecoration: "none",
                    color: "#092139",
                    fontWeight: "bold",
                    display: "block",
                    marginBottom: "10px",
                  }}
                >
                  View PDF
                </a>
                <p style={{ color: "#666", marginBottom: "0" }}>
                  Description: {learning_material.description}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default LearningMaterials;
