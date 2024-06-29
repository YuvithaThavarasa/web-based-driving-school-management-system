// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useParams, useNavigate } from "react-router-dom";

// function AcceptStudent() {
//   const { id } = useParams();
//   const [student, setStudent] = useState(null);
//   const [accepted, setAccepted] = useState(false); // State to track acceptance status
//   const [registeredDate, setRegisteredDate] = useState(""); // State to hold registered date
//   const navigate = useNavigate();
//   const [fleets, setFleets] = useState([]);
//   const [formData, setFormData] = useState({
//     vehicles: [],
//     amountPaid: "",
//     days: "",
//     medicalCertificate: null,
//     nicCopy: null,
//   });

//   useEffect(() => {
//     axios
//       .get(`http://localhost:5000/admin/student/${id}`)
//       .then((res) => {
//         setStudent(res.data);
//         setAccepted(res.data.accepted); // Set accepted status from server response
//         setRegisteredDate(res.data.registered_date); // Set registered date from server response
//       })
//       .catch((err) => {
//         console.error("Error fetching student:", err);
//         alert("Error fetching student: " + err.response.data.error);
//       });
//   }, [id]);

//   useEffect(() => {
//     axios
//       .get("http://localhost:5000/admin/fleet")
//       .then((res) => {
//         setFleets(res.data);
//       })
//       .catch((err) => console.error("Error fetching vehicle:", err));
//   }, []);

//   const handleChange = (e) => {
//     const { name, value, files, checked } = e.target;
//     if (name === "medicalCertificate" || name === "nicCopy") {
//       setFormData({
//         ...formData,
//         [name]: files[0],
//       });
//     } else if (name === "vehicles") {
//       const updatedVehicles = checked
//         ? [...formData.vehicles, value]
//         : formData.vehicles.filter((vehicle) => vehicle !== value);
//       setFormData({
//         ...formData,
//         vehicles: updatedVehicles,
//       });
//     } else {
//       setFormData({
//         ...formData,
//         [name]: value,
//       });
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (accepted) {
//       return; // If already accepted, do nothing
//     }
//     const formDataToSend = new FormData();
//     formDataToSend.append("vehicles", JSON.stringify(formData.vehicles));
//     formDataToSend.append("amountPaid", formData.amountPaid);
//     formDataToSend.append("days", formData.days);
//     formDataToSend.append("medicalCertificate", formData.medicalCertificate);
//     formDataToSend.append("nicCopy", formData.nicCopy);
//     formDataToSend.append("registeredDate", registeredDate); // Append registered date to formDataToSend

//     try {
//       const response = await axios.post(
//         `http://localhost:5000/admin/acceptstudent/${id}`,
//         formDataToSend,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );
//       console.log("Student accepted:", response.data);
//       setAccepted(true); // Update accepted status locally
//       navigate("/admin/registered-students");
//     } catch (error) {
//       console.error("Error accepting student:", error);
//     }
//   };

//   if (!student) {
//     return <div>Loading...</div>;
//   }

//   const uniqueVehicleTypes = Array.from(
//     new Set(fleets.map((fleet) => fleet.vehicleType))
//   );

//   return (
//     <div className="container mt-5">
//       <h2>Accept Student: {student.ID}</h2>
//       <p>
//         <b>Name:</b> {student.firstName} {student.lastName}
//       </p>
//       <p>
//         <b>Email:</b> {student.email}
//       </p>
//       <p>
//         <b>Phone number:</b> {student.phoneNumber}
//       </p>
//       <p>
//         <b>NIC number:</b> {student.nicNumber}
//       </p>
//       <form onSubmit={handleSubmit}>
//         <div className="mb-3">
//           <label className="form-label">Vehicles</label>
//           {uniqueVehicleTypes.map((vehicleType) => (
//             <div key={vehicleType} className="form-check">
//               <input
//                 type="checkbox"
//                 id={vehicleType}
//                 name="vehicles"
//                 value={vehicleType}
//                 onChange={handleChange}
//                 className="form-check-input"
//               />
//               <label htmlFor={vehicleType} className="form-check-label">
//                 {vehicleType}
//               </label>
//             </div>
//           ))}
//         </div>
//         <div className="mb-3">
//           <label htmlFor="amountPaid" className="form-label">
//             Amount
//           </label>
//           <input
//             type="text"
//             id="amountPaid"
//             name="amountPaid"
//             value={formData.amountPaid}
//             onChange={handleChange}
//             className="form-control"
//             required
//           />
//         </div>
//         <div className="mb-3">
//           <label htmlFor="days" className="form-label">
//             Days
//           </label>
//           <input
//             type="number"
//             id="days"
//             name="days"
//             value={formData.days}
//             onChange={handleChange}
//             className="form-control"
//             required
//           />
//         </div>
//         <div className="mb-3">
//           <label htmlFor="medicalCertificate" className="form-label">
//             Medical Certificate
//           </label>
//           <input
//             type="file"
//             id="medicalCertificate"
//             name="medicalCertificate"
//             onChange={handleChange}
//             className="form-control"
//             required
//           />
//         </div>
//         <div className="mb-3">
//           <label htmlFor="nicCopy" className="form-label">
//             NIC Copy
//           </label>
//           <input
//             type="file"
//             id="nicCopy"
//             name="nicCopy"
//             onChange={handleChange}
//             className="form-control"
//             required
//           />
//         </div>

//         <div className="mb-3">
//           <label htmlFor="registeredDate" className="form-label">
//             Registered Date
//           </label>
//           <input
//             type="date"
//             id="registeredDate"
//             name="registeredDate"
//             value={registeredDate}
//             onChange={(e) => setRegisteredDate(e.target.value)}
//             className="form-control"
//             required
//           />
//         </div>

//         <button type="submit" className="btn btn-primary" disabled={accepted}>
//           {accepted ? "Accepted" : "Accept Student"}
//         </button>
//       </form>
//     </div>
//   );
// }

// export default AcceptStudent;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function AcceptStudent() {
  const { id } = useParams();
  const [student, setStudent] = useState(null);
  const [accepted, setAccepted] = useState(false); // State to track acceptance status
  const [registeredDate, setRegisteredDate] = useState(""); // State to hold registered date
  const navigate = useNavigate();
  const [fleets, setFleets] = useState([]);
  const [formData, setFormData] = useState({
    vehicles: [],
    amountPaid: "", // Updated to be calculated automatically
    days: "",
    medicalCertificate: null,
    nicCopy: null,
  });
  const [pricingData, setPricingData] = useState([]); // State to store pricing data

  useEffect(() => {
    axios
      .get(`http://localhost:5000/admin/student/${id}`)
      .then((res) => {
        setStudent(res.data);
        setAccepted(res.data.accepted); // Set accepted status from server response
        setRegisteredDate(res.data.registered_date); // Set registered date from server response
        setFormData((prevData) => ({
          ...prevData,
          vehicles: res.data.vehicles ? JSON.parse(res.data.vehicles) : [],
        }));
      })
      .catch((err) => {
        console.error("Error fetching student:", err);
        alert("Error fetching student: " + err.response.data.error);
      });

    axios
      .get("http://localhost:5000/admin/fleet")
      .then((res) => {
        setFleets(res.data);
      })
      .catch((err) => console.error("Error fetching vehicle:", err));

    axios
      .get("http://localhost:5000/admin/pricing")
      .then((res) => {
        setPricingData(res.data);
      })
      .catch((err) => console.error("Error fetching pricing:", err));
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files, checked } = e.target;
    if (name === "medicalCertificate" || name === "nicCopy") {
      setFormData({
        ...formData,
        [name]: files[0],
      });
    } else if (name === "vehicles") {
      const updatedVehicles = checked
        ? [...formData.vehicles, value]
        : formData.vehicles.filter((vehicle) => vehicle !== value);
      setFormData({
        ...formData,
        vehicles: updatedVehicles,
      });
      // Calculate amount when vehicles change
      calculateAmount(updatedVehicles);
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const calculateAmount = (selectedVehicles) => {
    let totalAmount = 0;
    selectedVehicles.forEach((vehicleType) => {
      const vehiclePricing = pricingData.find(
        (item) => item.vehicleType === vehicleType
      );
      if (vehiclePricing) {
        totalAmount += parseFloat(vehiclePricing.fee);
      }
    });
    setFormData((prevData) => ({
      ...prevData,
      amountPaid: totalAmount.toFixed(2),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (accepted) {
      return; // If already accepted, do nothing
    }
    const formDataToSend = new FormData();
    formDataToSend.append("vehicles", JSON.stringify(formData.vehicles));
    formDataToSend.append("amountPaid", formData.amountPaid);
    formDataToSend.append("days", formData.days);
    formDataToSend.append("medicalCertificate", formData.medicalCertificate);
    formDataToSend.append("nicCopy", formData.nicCopy);
    formDataToSend.append("registeredDate", registeredDate); // Append registered date to formDataToSend

    try {
      const response = await axios.post(
        `http://localhost:5000/admin/acceptstudent/${id}`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Student accepted:", response.data);
      setAccepted(true); // Update accepted status locally
      navigate("/admin/registered-students");
    } catch (error) {
      console.error("Error accepting student:", error);
    }
  };

  if (!student) {
    return <div>Loading...</div>;
  }

  const uniqueVehicleTypes = Array.from(
    new Set(fleets.map((fleet) => fleet.vehicleType))
  );

  return (
    <div className="container mt-5">
      <h2>Accept Student: {student.ID}</h2>
      <p>
        <b>Name:</b> {student.firstName} {student.lastName}
      </p>
      <p>
        <b>Email:</b> {student.email}
      </p>
      <p>
        <b>Phone number:</b> {student.phoneNumber}
      </p>
      <p>
        <b>NIC number:</b> {student.nicNumber}
      </p>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Vehicles</label>
          {uniqueVehicleTypes.map((vehicleType) => (
            <div key={vehicleType} className="form-check">
              <input
                type="checkbox"
                id={vehicleType}
                name="vehicles"
                value={vehicleType}
                onChange={handleChange}
                className="form-check-input"
                checked={formData.vehicles.includes(vehicleType)}
              />
              <label htmlFor={vehicleType} className="form-check-label">
                {vehicleType}
              </label>
            </div>
          ))}
        </div>
        <div className="mb-3">
          <label htmlFor="amountPaid" className="form-label">
            Amount
          </label>
          <input
            type="text"
            id="amountPaid"
            name="amountPaid"
            value={formData.amountPaid}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="days" className="form-label">
            Days
          </label>
          <input
            type="number"
            id="days"
            name="days"
            value={formData.days}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="medicalCertificate" className="form-label">
            Medical Certificate
          </label>
          <input
            type="file"
            id="medicalCertificate"
            name="medicalCertificate"
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="nicCopy" className="form-label">
            NIC Copy
          </label>
          <input
            type="file"
            id="nicCopy"
            name="nicCopy"
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="registeredDate" className="form-label">
            Registered Date
          </label>
          <input
            type="date"
            id="registeredDate"
            name="registeredDate"
            value={registeredDate}
            onChange={(e) => setRegisteredDate(e.target.value)}
            className="form-control"
            required
          />
        </div>

        <button type="submit" className="btn btn-primary" disabled={accepted}>
          {accepted ? "Accepted" : "Accept Student"}
        </button>
      </form>
    </div>
  );
}

export default AcceptStudent;
