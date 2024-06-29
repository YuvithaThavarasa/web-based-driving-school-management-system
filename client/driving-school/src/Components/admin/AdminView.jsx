// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import FullCalendar from "@fullcalendar/react";
// import dayGridPlugin from "@fullcalendar/daygrid";
// import Footer from "../Layouts/Footer";
// import moment from "moment-timezone";
// import {
//   Modal,
//   Box,
//   Typography,
//   List,
//   ListItem,
//   ListItemText,
// } from "@mui/material";

// function AdminView() {
//   const [sessions, setSessions] = useState([]);
//   const [formData, setFormData] = useState({
//     session_name: "",
//     session_date: "",
//     start_time: "",
//     end_time: "",
//     instructor_id: "",
//     vehicleType: "",
//   });
//   const [instructors, setInstructors] = useState([]);
//   const [vehicles, setVehicles] = useState([]);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [students, setStudents] = useState([]);
//   const [selectedSession, setSelectedSession] = useState(null);

//   useEffect(() => {
//     const fetchSessions = axios.get("http://localhost:5000/admin/session");
//     const fetchInstructors = axios.get(
//       "http://localhost:5000/admin/instructor"
//     );
//     const fetchVehicles = axios.get("http://localhost:5000/admin/vehicletypes");

//     Promise.all([fetchSessions, fetchInstructors, fetchVehicles])
//       .then((results) => {
//         const sessionData = results[0].data.map((driving_session) => ({
//           ...driving_session,
//           session_date: moment(driving_session.session_date)
//             .tz("Asia/Colombo")
//             .format(),
//           // Convert start_time and end_time similarly
//         }));
//         const instructorData = results[1].data;
//         const vehicleData = results[2].data;

//         console.log("Fetched Sessions:", sessionData);
//         console.log("Fetched Instructors:", instructorData);
//         console.log("Fetched Vehicles:", vehicleData);

//         setSessions(sessionData);
//         setInstructors(instructorData);
//         setVehicles(vehicleData);
//       })
//       .catch((err) => console.error("Error fetching data:", err));
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     axios
//       .post("http://localhost:5000/admin/session/add", formData)
//       .then((res) => {
//         setSessions([...sessions, res.data]);
//         setFormData({
//           session_name: "",
//           session_date: "",
//           start_time: "",
//           end_time: "",
//           instructor_id: "",
//           vehicleType: "",
//         });
//       })
//       .catch((err) => console.error("Error creating session:", err));
//   };
//   const handleEventClick = async (eventInfo) => {
//     const sessionId = eventInfo.event.extendedProps.driving_session.id;
//     setSelectedSession(eventInfo.event);

//     const token = localStorage.getItem("token");

//     try {
//       const response = await axios.get(
//         `http://localhost:5000/instructor/session-students/${sessionId}`,
//         {
//           headers: {
//             "x-access-token": token,
//           },
//         }
//       );

//       setStudents(response.data);
//       setModalOpen(true);
//     } catch (error) {
//       console.error("Error fetching students:", error);
//     }
//   };

//   const renderEventContent = (eventInfo) => {
//     const { driving_session } = eventInfo.event.extendedProps;

//     const instructor = instructors.find(
//       (inst) => inst.ID === driving_session.instructor_id
//     );

//     const vehicle = vehicles.find(
//       (veh) => veh.vehicleType === driving_session.vehicleType
//     );

//     const startTime = new Date(eventInfo.event.start).toLocaleTimeString([], {
//       hour: "2-digit",
//       minute: "2-digit",
//     });
//     const endTime = new Date(eventInfo.event.end).toLocaleTimeString([], {
//       hour: "2-digit",
//       minute: "2-digit",
//     });

//     return (
//       <div>
//         <b>
//           {startTime} - {endTime}
//         </b>
//         <div>{eventInfo.event.title}</div>
//         <div>
//           Instructor:{" "}
//           {instructor
//             ? `${instructor.firstName} ${instructor.lastName}`
//             : "N/A"}
//         </div>
//         <div>Vehicle: {vehicle ? vehicle.vehicleType : "N/A"}</div>
//       </div>
//     );
//   };

//   return (
//     <div>
//       <h2>Admin - Manage Sessions</h2>

//       <form
//         onSubmit={handleSubmit}
//         className="d-flex justify-content-center mt-4"
//         style={{ maxWidth: "2200px" }}
//       >
//         <div className="form-group">
//           <label htmlFor="session_name">Session Name</label>
//           <input
//             type="text"
//             name="session_name"
//             value={formData.session_name}
//             onChange={handleChange}
//             className="form-control"
//             id="session_name"
//             placeholder="Enter session name"
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="session_date">Session Date</label>
//           <input
//             type="date"
//             name="session_date"
//             value={formData.session_date}
//             onChange={handleChange}
//             className="form-control"
//             id="session_date"
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="start_time">Start Time</label>
//           <input
//             type="time"
//             name="start_time"
//             value={formData.start_time}
//             onChange={handleChange}
//             className="form-control"
//             id="start_time"
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="end_time">End Time</label>
//           <input
//             type="time"
//             name="end_time"
//             value={formData.end_time}
//             onChange={handleChange}
//             className="form-control"
//             id="end_time"
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="instructor_id">Instructor</label>
//           <select
//             name="instructor_id"
//             value={formData.instructor_id}
//             onChange={handleChange}
//             className="form-control"
//             id="instructor_id"
//             required
//           >
//             <option value="">Select Instructor</option>
//             {instructors.map((instructor) => (
//               <option key={instructor.ID} value={instructor.ID}>
//                 {instructor.firstName} {instructor.lastName}
//               </option>
//             ))}
//           </select>
//         </div>

//         <div className="form-group">
//           <label htmlFor="vehicleType">Vehicle Type</label>
//           <select
//             name="vehicleType"
//             value={formData.vehicleType}
//             onChange={handleChange}
//             className="form-control"
//             id="vehicleType"
//             required
//           >
//             <option value="" disabled>
//               Select a vehicle
//             </option>
//             {vehicles.map((fleet) => (
//               <option key={fleet.vehicleType} value={fleet.vehicleType}>
//                 {fleet.vehicleType}
//               </option>
//             ))}
//           </select>
//         </div>
//         <button type="submit" className="btn btn-primary">
//           Create Session
//         </button>
//       </form>

//       <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
//         <FullCalendar
//           plugins={[dayGridPlugin]}
//           events={sessions.map((driving_session) => ({
//             title: driving_session.session_name,
//             start: `${driving_session.session_date.split("T")[0]}T${
//               driving_session.start_time
//             }`,
//             end: `${driving_session.session_date.split("T")[0]}T${
//               driving_session.end_time
//             }`,
//             extendedProps: { driving_session },
//           }))}
//           eventContent={renderEventContent}
//           eventClick={handleEventClick}
//         />
//       </div>

//       <Modal
//         open={modalOpen}
//         onClose={() => setModalOpen(false)}
//         aria-labelledby="modal-title"
//         aria-describedby="modal-description"
//       >
//         <Box
//           sx={{
//             p: 4,
//             backgroundColor: "white",
//             maxWidth: 500,
//             margin: "0 auto",
//             mt: "10%",
//           }}
//         >
//           <Typography id="modal-title" variant="h6" component="h2">
//             Students for {selectedSession?.title}
//           </Typography>
//           <List>
//             {students.map((student) => (
//               <ListItem key={student.id}>
//                 <ListItemText
//                   primary={student.firstName}
//                   secondary={student.email}
//                 />
//               </ListItem>
//             ))}
//           </List>
//         </Box>
//       </Modal>
//       <Footer />
//     </div>
//   );
// }

// export default AdminView;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import FullCalendar from "@fullcalendar/react";
// import dayGridPlugin from "@fullcalendar/daygrid";
// import Footer from "../Layouts/Footer";
// import moment from "moment-timezone";
// import {
//   Modal,
//   Box,
//   Typography,
//   List,
//   ListItem,
//   ListItemText,
// } from "@mui/material";

// function AdminView() {
//   const [sessions, setSessions] = useState([]);
//   const [formData, setFormData] = useState({
//     session_name: "",
//     session_date: "",
//     start_time: "",
//     end_time: "",
//     instructor_id: "",
//     vehicleType: "",
//   });
//   const [instructors, setInstructors] = useState([]);
//   const [vehicles, setVehicles] = useState([]);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [students, setStudents] = useState([]);
//   const [selectedSession, setSelectedSession] = useState(null);
//   const [unavailableInstructors, setUnavailableInstructors] = useState([]);
//   const [instructorVehicles, setInstructorVehicles] = useState([]);
//   const [selectedInstructorId, setSelectedInstructorId] = useState("");

//   useEffect(() => {
//     const fetchSessions = axios.get("http://localhost:5000/admin/session");
//     const fetchInstructors = axios.get(
//       "http://localhost:5000/admin/instructor"
//     );

//     Promise.all([fetchSessions, fetchInstructors])
//       .then((results) => {
//         const sessionData = results[0].data.map((driving_session) => ({
//           ...driving_session,
//           session_date: moment(driving_session.session_date)
//             .tz("Asia/Colombo")
//             .format(),
//         }));
//         const instructorData = results[1].data;

//         console.log("Fetched Sessions:", sessionData);
//         console.log("Fetched Instructors:", instructorData);

//         setSessions(sessionData);
//         setInstructors(instructorData);
//       })
//       .catch((err) => console.error("Error fetching data:", err));
//   }, []);

//   useEffect(() => {
//     if (selectedInstructorId) {
//       axios
//         .get(
//           `http://localhost:5000/admin/instructor/${selectedInstructorId}/vehicles`
//         )
//         .then((res) => {
//           setInstructorVehicles(res.data);
//         })
//         .catch((err) =>
//           console.error("Error fetching instructor's vehicles:", err)
//         );
//     }
//   }, [selectedInstructorId]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//     if (
//       name === "session_date" ||
//       name === "start_time" ||
//       name === "end_time"
//     ) {
//       checkInstructorAvailability({ ...formData, [name]: value });
//     }
//     if (name === "instructor_id") {
//       setSelectedInstructorId(value);
//     }
//   };

//   const checkInstructorAvailability = (data) => {
//     const { session_date, start_time, end_time } = data;
//     if (session_date && start_time && end_time) {
//       axios
//         .get("http://localhost:5000/instructor/availability", {
//           params: { session_date, start_time, end_time },
//         })
//         .then((res) => {
//           setUnavailableInstructors(res.data.map((item) => item.instructor_id));
//         })
//         .catch((err) =>
//           console.error("Error fetching instructor availability:", err)
//         );
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     axios
//       .post("http://localhost:5000/admin/session/add", formData)
//       .then((res) => {
//         setSessions([...sessions, res.data]);
//         setFormData({
//           session_name: "",
//           session_date: "",
//           start_time: "",
//           end_time: "",
//           instructor_id: "",
//           vehicleType: "",
//         });
//       })
//       .catch((err) => console.error("Error creating session:", err));
//   };

//   const handleEventClick = async (eventInfo) => {
//     const sessionId = eventInfo.event.extendedProps.driving_session.id;
//     setSelectedSession(eventInfo.event);

//     const token = localStorage.getItem("token");

//     try {
//       const response = await axios.get(
//         `http://localhost:5000/instructor/session-students/${sessionId}`,
//         {
//           headers: {
//             "x-access-token": token,
//           },
//         }
//       );

//       setStudents(response.data);
//       setModalOpen(true);
//     } catch (error) {
//       console.error("Error fetching students:", error);
//     }
//   };

//   const renderEventContent = (eventInfo) => {
//     const { driving_session } = eventInfo.event.extendedProps;

//     const instructor = instructors.find(
//       (inst) => inst.ID === driving_session.instructor_id
//     );

//     const vehicle = vehicles.find(
//       (veh) => veh.vehicleType === driving_session.vehicleType
//     );

//     const startTime = new Date(eventInfo.event.start).toLocaleTimeString([], {
//       hour: "2-digit",
//       minute: "2-digit",
//     });
//     const endTime = new Date(eventInfo.event.end).toLocaleTimeString([], {
//       hour: "2-digit",
//       minute: "2-digit",
//     });

//     return (
//       <div>
//         <b>
//           {startTime} - {endTime}
//         </b>
//         <div>{eventInfo.event.title}</div>
//         <div>
//           Instructor:{" "}
//           {instructor
//             ? `${instructor.firstName} ${instructor.lastName}`
//             : "N/A"}
//         </div>
//         {/* <div>Vehicle: {vehicle ? vehicle.vehicleType : "N/A"}</div> */}
//       </div>
//     );
//   };

//   return (
//     <div>
//       <h2>Admin - Manage Sessions</h2>

//       <form
//         onSubmit={handleSubmit}
//         className="d-flex justify-content-center mt-4"
//         style={{ maxWidth: "2200px" }}
//       >
//         <div className="form-group">
//           <label htmlFor="session_name">Session Name</label>
//           <input
//             type="text"
//             name="session_name"
//             value={formData.session_name}
//             onChange={handleChange}
//             className="form-control"
//             id="session_name"
//             placeholder="Enter session name"
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="session_date">Session Date</label>
//           <input
//             type="date"
//             name="session_date"
//             value={formData.session_date}
//             onChange={handleChange}
//             className="form-control"
//             id="session_date"
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="start_time">Start Time</label>
//           <input
//             type="time"
//             name="start_time"
//             value={formData.start_time}
//             onChange={handleChange}
//             className="form-control"
//             id="start_time"
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="end_time">End Time</label>
//           <input
//             type="time"
//             name="end_time"
//             value={formData.end_time}
//             onChange={handleChange}
//             className="form-control"
//             id="end_time"
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="instructor_id">Instructor</label>
//           <select
//             name="instructor_id"
//             value={formData.instructor_id}
//             onChange={handleChange}
//             className="form-control"
//             id="instructor_id"
//             required
//           >
//             <option value="">Select Instructor</option>
//             {instructors.map((instructor) => (
//               <option
//                 key={instructor.ID}
//                 value={instructor.ID}
//                 disabled={unavailableInstructors.includes(instructor.ID)}
//               >
//                 {instructor.firstName} {instructor.lastName}{" "}
//                 {unavailableInstructors.includes(instructor.ID)
//                   ? "(Unavailable)"
//                   : ""}
//               </option>
//             ))}
//           </select>
//         </div>

//         <div className="form-group">
//           <label htmlFor="vehicleType">Vehicle Type</label>
//           <select
//             name="vehicleType"
//             value={formData.vehicleType}
//             onChange={handleChange}
//             className="form-control"
//             id="vehicleType"
//             required
//           >
//             <option value="" disabled>
//               Select a vehicle
//             </option>
//             {instructorVehicles.map((vehicle) => (
//               <option key={vehicle} value={vehicle}>
//                 {vehicle}
//               </option>
//             ))}
//           </select>
//         </div>
//         <button type="submit" className="btn btn-primary">
//           Create Session
//         </button>
//       </form>

//       <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
//         <FullCalendar
//           plugins={[dayGridPlugin]}
//           events={sessions.map((driving_session) => ({
//             title: driving_session.session_name,
//             start: `${driving_session.session_date.split("T")[0]}T${
//               driving_session.start_time
//             }`,
//             end: `${driving_session.session_date.split("T")[0]}T${
//               driving_session.end_time
//             }`,
//             extendedProps: { driving_session },
//           }))}
//           eventContent={renderEventContent}
//           eventClick={handleEventClick}
//         />
//       </div>

//       <Modal
//         open={modalOpen}
//         onClose={() => setModalOpen(false)}
//         aria-labelledby="modal-title"
//         aria-describedby="modal-description"
//       >
//         <Box
//           sx={{
//             p: 4,
//             backgroundColor: "white",
//             maxWidth: 500,
//             margin: "0 auto",
//             mt: "10%",
//           }}
//         >
//           <Typography id="modal-title" variant="h6" component="h2">
//             Students for {selectedSession?.title}
//           </Typography>
//           <List>
//             {students.map((student) => (
//               <ListItem key={student.id}>
//                 <ListItemText
//                   primary={student.firstName}
//                   secondary={student.email}
//                 />
//               </ListItem>
//             ))}
//           </List>
//         </Box>
//       </Modal>
//       <Footer />
//     </div>
//   );
// }

// export default AdminView;

//before styling
import React, { useState, useEffect } from "react";
import axios from "axios";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import Footer from "../Layouts/Footer";
import moment from "moment-timezone";
import {
  Modal,
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import Sidebar from "./Sidebar";

function AdminView() {
  const [sessions, setSessions] = useState([]);
  const [formData, setFormData] = useState({
    session_name: "",
    session_date: "",
    start_time: "",
    end_time: "",
    instructor_id: "",
    vehicleType: "",
  });
  const [instructors, setInstructors] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [students, setStudents] = useState([]);
  const [selectedSession, setSelectedSession] = useState(null);
  const [unavailableInstructors, setUnavailableInstructors] = useState([]);
  const [instructorVehicles, setInstructorVehicles] = useState([]);
  const [selectedInstructorId, setSelectedInstructorId] = useState("");

  useEffect(() => {
    const fetchSessions = axios.get("http://localhost:5000/admin/session");
    const fetchInstructors = axios.get(
      "http://localhost:5000/admin/instructor"
    );

    Promise.all([fetchSessions, fetchInstructors])
      .then((results) => {
        const sessionData = results[0].data.map((driving_session) => ({
          ...driving_session,
          session_date: moment(driving_session.session_date)
            .tz("Asia/Colombo")
            .format(),
        }));
        const instructorData = results[1].data;

        console.log("Fetched Sessions:", sessionData);
        console.log("Fetched Instructors:", instructorData);

        setSessions(sessionData);
        setInstructors(instructorData);
      })
      .catch((err) => console.error("Error fetching data:", err));
  }, []);

  useEffect(() => {
    if (selectedInstructorId) {
      axios
        .get(
          `http://localhost:5000/admin/instructor/${selectedInstructorId}/vehicles`
        )
        .then((res) => {
          setInstructorVehicles(res.data);
        })
        .catch((err) =>
          console.error("Error fetching instructor's vehicles:", err)
        );
    }
  }, [selectedInstructorId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (
      name === "session_date" ||
      name === "start_time" ||
      name === "end_time"
    ) {
      checkInstructorAvailability({ ...formData, [name]: value });
    }
    if (name === "instructor_id") {
      setSelectedInstructorId(value);
    }
  };

  const checkInstructorAvailability = (data) => {
    const { session_date, start_time, end_time } = data;
    if (session_date && start_time && end_time) {
      axios
        .get("http://localhost:5000/instructor/availability", {
          params: { session_date, start_time, end_time },
        })
        .then((res) => {
          setUnavailableInstructors(res.data.map((item) => item.instructor_id));
        })
        .catch((err) =>
          console.error("Error fetching instructor availability:", err)
        );
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { start_time, end_time } = formData;

    if (end_time <= start_time) {
      alert("End time must be greater than start time.");
      return;
    }

    const { instructor_id, session_date } = formData;

    axios
      .get("http://localhost:5000/instructor/availabilityy", {
        params: { instructor_id, session_date, start_time, end_time },
      })
      .then((res) => {
        if (res.data) {
          // If the instructor is available
          axios
            .post("http://localhost:5000/admin/session/add", formData)
            .then((res) => {
              setSessions([...sessions, res.data]);
              setFormData({
                session_name: "",
                session_date: "",
                start_time: "",
                end_time: "",
                instructor_id: "",
                vehicleType: "",
              });
            })
            .catch((err) => console.error("Error creating session:", err));
        } else {
          alert(
            "Instructor is not available for the selected time slot. Please choose a different time."
          );
        }
      })
      .catch((err) =>
        console.error("Error checking instructor availability:", err)
      );
  };

  const handleEventClick = async (eventInfo) => {
    const sessionId = eventInfo.event.extendedProps.driving_session.id;
    setSelectedSession(eventInfo.event);

    const token = localStorage.getItem("token");

    try {
      const response = await axios.get(
        `http://localhost:5000/instructor/session-students/${sessionId}`,
        {
          headers: {
            "x-access-token": token,
          },
        }
      );

      setStudents(response.data);
      setModalOpen(true);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const renderEventContent = (eventInfo) => {
    const { driving_session } = eventInfo.event.extendedProps;

    const instructor = instructors.find(
      (inst) => inst.ID === driving_session.instructor_id
    );

    const vehicle = vehicles.find(
      (veh) => veh.vehicleType === driving_session.vehicleType
    );

    const startTime = new Date(eventInfo.event.start).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    const endTime = new Date(eventInfo.event.end).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    return (
      <div>
        <b>
          {startTime} - {endTime}
        </b>
        <div>{eventInfo.event.title}</div>
        <div>
          Instructor:{" "}
          {instructor
            ? `${instructor.firstName} ${instructor.lastName}`
            : "N/A"}
        </div>
        <div>
          Vehicle: {driving_session ? driving_session.vehicleType : "N/A"}
        </div>
      </div>
    );
  };

  return (
    <div>
      <div>
        <form
          onSubmit={handleSubmit}
          className="d-flex justify-content-center mt-4"
          style={{ maxWidth: "2200px" }}
        >
          <div className="form-group">
            <label htmlFor="session_name">Session Name</label>
            <input
              type="text"
              name="session_name"
              value={formData.session_name}
              onChange={handleChange}
              className="form-control"
              id="session_name"
              placeholder="Enter session name"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="session_date">Session Date</label>
            <input
              type="date"
              name="session_date"
              value={formData.session_date}
              onChange={handleChange}
              className="form-control"
              id="session_date"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="start_time">Start Time</label>
            <input
              type="time"
              name="start_time"
              value={formData.start_time}
              onChange={handleChange}
              className="form-control"
              id="start_time"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="end_time">End Time</label>
            <input
              type="time"
              name="end_time"
              value={formData.end_time}
              onChange={handleChange}
              className="form-control"
              id="end_time"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="instructor_id">Instructor</label>
            <select
              name="instructor_id"
              value={formData.instructor_id}
              onChange={handleChange}
              className="form-control"
              id="instructor_id"
              required
            >
              <option value="" disabled>
                Select an instructor
              </option>
              {instructors.map((instructor) => (
                <option key={instructor.ID} value={instructor.ID}>
                  {instructor.firstName} {instructor.lastName}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="vehicleType">Vehicle Type</label>
            <select
              name="vehicleType"
              value={formData.vehicleType}
              onChange={handleChange}
              className="form-control"
              id="vehicleType"
              required
            >
              <option value="" disabled>
                Select a vehicle
              </option>
              {instructorVehicles.map((vehicle) => (
                <option key={vehicle} value={vehicle}>
                  {vehicle}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className="btn btn-primary">
            Create Session
          </button>
        </form>
        <br></br>

        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <FullCalendar
            plugins={[dayGridPlugin]}
            events={sessions.map((driving_session) => ({
              title: driving_session.session_name,
              start: `${driving_session.session_date.split("T")[0]}T${
                driving_session.start_time
              }`,
              end: `${driving_session.session_date.split("T")[0]}T${
                driving_session.end_time
              }`,
              extendedProps: { driving_session },
            }))}
            eventContent={renderEventContent}
            eventClick={handleEventClick}
          />
        </div>

        <Modal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
        >
          <Box
            sx={{
              p: 4,
              backgroundColor: "white",
              maxWidth: 500,
              margin: "0 auto",
              mt: "10%",
            }}
          >
            <Typography id="modal-title" variant="h6" component="h2">
              Students for {selectedSession?.title}
            </Typography>
            <List>
              {students.map((student) => (
                <ListItem key={student.id}>
                  <ListItemText
                    primary={student.firstName}
                    secondary={student.email}
                  />
                </ListItem>
              ))}
            </List>
          </Box>
        </Modal>
        <Footer />
      </div>
      <Sidebar />
    </div>
  );
}

export default AdminView;
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import FullCalendar from "@fullcalendar/react";
// import dayGridPlugin from "@fullcalendar/daygrid";
// import Footer from "../Layouts/Footer";
// import moment from "moment-timezone";
// import Sidebar from "./Sidebar";

// import {
//   Modal,
//   Box,
//   Typography,
//   List,
//   ListItem,
//   ListItemText,
// } from "@mui/material";

// function AdminView() {
//   const [sessions, setSessions] = useState([]);
//   const [formData, setFormData] = useState({
//     session_name: "",
//     session_date: "",
//     start_time: "",
//     end_time: "",
//     instructor_id: "",
//     vehicleType: "",
//   });
//   const [instructors, setInstructors] = useState([]);
//   const [vehicles, setVehicles] = useState([]);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [students, setStudents] = useState([]);
//   const [selectedSession, setSelectedSession] = useState(null);
//   const [unavailableInstructors, setUnavailableInstructors] = useState([]);
//   const [instructorVehicles, setInstructorVehicles] = useState([]);
//   const [selectedInstructorId, setSelectedInstructorId] = useState("");

//   useEffect(() => {
//     const fetchSessions = axios.get("http://localhost:5000/admin/session");
//     const fetchInstructors = axios.get(
//       "http://localhost:5000/admin/instructor"
//     );

//     Promise.all([fetchSessions, fetchInstructors])
//       .then((results) => {
//         const sessionData = results[0].data.map((driving_session) => ({
//           ...driving_session,
//           session_date: moment(driving_session.session_date)
//             .tz("Asia/Colombo")
//             .format(),
//         }));
//         const instructorData = results[1].data;

//         console.log("Fetched Sessions:", sessionData);
//         console.log("Fetched Instructors:", instructorData);

//         setSessions(sessionData);
//         setInstructors(instructorData);
//       })
//       .catch((err) => console.error("Error fetching data:", err));
//   }, []);

//   useEffect(() => {
//     if (selectedInstructorId) {
//       axios
//         .get(
//           `http://localhost:5000/admin/instructor/${selectedInstructorId}/vehicles`
//         )
//         .then((res) => {
//           setInstructorVehicles(res.data);
//         })
//         .catch((err) =>
//           console.error("Error fetching instructor's vehicles:", err)
//         );
//     }
//   }, [selectedInstructorId]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//     if (
//       name === "session_date" ||
//       name === "start_time" ||
//       name === "end_time"
//     ) {
//       checkInstructorAvailability({ ...formData, [name]: value });
//     }
//     if (name === "instructor_id") {
//       setSelectedInstructorId(value);
//     }
//   };

//   const checkInstructorAvailability = (data) => {
//     const { session_date, start_time, end_time } = data;
//     if (session_date && start_time && end_time) {
//       axios
//         .get("http://localhost:5000/instructor/availability", {
//           params: { session_date, start_time, end_time },
//         })
//         .then((res) => {
//           setUnavailableInstructors(res.data.map((item) => item.instructor_id));
//         })
//         .catch((err) =>
//           console.error("Error fetching instructor availability:", err)
//         );
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const { start_time, end_time } = formData;

//     if (end_time <= start_time) {
//       alert("End time must be greater than start time.");
//       return;
//     }

//     const { instructor_id, session_date } = formData;

//     axios
//       .get("http://localhost:5000/instructor/availability", {
//         params: { instructor_id, session_date, start_time, end_time },
//       })
//       .then((res) => {
//         if (res.data) {
//           axios
//             .post("http://localhost:5000/admin/session/add", formData)
//             .then((res) => {
//               setSessions([...sessions, res.data]);
//               setFormData({
//                 session_name: "",
//                 session_date: "",
//                 start_time: "",
//                 end_time: "",
//                 instructor_id: "",
//                 vehicleType: "",
//               });
//             })
//             .catch((err) => console.error("Error creating session:", err));
//         } else {
//           alert(
//             "Instructor is not available for the selected time slot. Please choose a different time."
//           );
//         }
//       })
//       .catch((err) =>
//         console.error("Error checking instructor availability:", err)
//       );
//   };

//   const handleEventClick = async (eventInfo) => {
//     const sessionId = eventInfo.event.extendedProps.driving_session.id;
//     setSelectedSession(eventInfo.event);

//     const token = localStorage.getItem("token");

//     try {
//       const response = await axios.get(
//         `http://localhost:5000/instructor/session-students/${sessionId}`,
//         {
//           headers: {
//             "x-access-token": token,
//           },
//         }
//       );

//       setStudents(response.data);
//       setModalOpen(true);
//     } catch (error) {
//       console.error("Error fetching students:", error);
//     }
//   };

//   const renderEventContent = (eventInfo) => {
//     const { driving_session } = eventInfo.event.extendedProps;

//     const instructor = instructors.find(
//       (inst) => inst.ID === driving_session.instructor_id
//     );

//     const vehicle = vehicles.find(
//       (veh) => veh.vehicleType === driving_session.vehicleType
//     );

//     const startTime = new Date(eventInfo.event.start).toLocaleTimeString([], {
//       hour: "2-digit",
//       minute: "2-digit",
//     });
//     const endTime = new Date(eventInfo.event.end).toLocaleTimeString([], {
//       hour: "2-digit",
//       minute: "2-digit",
//     });

//     return (
//       <div
//         style={{
//           padding: "10px",
//           backgroundColor: "#f0f0f0",
//           borderRadius: "5px",
//         }}
//       >
//         <b>
//           {startTime} - {endTime}
//         </b>
//         <div>{eventInfo.event.title}</div>
//         <div>
//           Instructor:{" "}
//           {instructor
//             ? `${instructor.firstName} ${instructor.lastName}`
//             : "N/A"}
//         </div>
//         <div>
//           Vehicle: {driving_session ? driving_session.vehicleType : "N/A"}
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div>
//       <div
//         style={{
//           fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
//         }}
//       >
//         <h2 style={{ textAlign: "center", margin: "20px 0" }}>
//           Admin - Manage Sessions
//         </h2>

//         <form
//           onSubmit={handleSubmit}
//           className="d-flex justify-content-center"
//           style={{
//             maxWidth: "1100px",
//             margin: "0 auto",
//             padding: "20px",
//             backgroundColor: "#fff",
//             borderRadius: "10px",
//             boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
//           }}
//         >
//           <div className="form-group">
//             <label htmlFor="session_name">Session Name</label>
//             <input
//               type="text"
//               name="session_name"
//               value={formData.session_name}
//               onChange={handleChange}
//               className="form-control"
//               id="session_name"
//               placeholder="Enter session name"
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="session_date">Session Date</label>
//             <input
//               type="date"
//               name="session_date"
//               value={formData.session_date}
//               onChange={handleChange}
//               className="form-control"
//               id="session_date"
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="start_time">Start Time</label>
//             <input
//               type="time"
//               name="start_time"
//               value={formData.start_time}
//               onChange={handleChange}
//               className="form-control"
//               id="start_time"
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="end_time">End Time</label>
//             <input
//               type="time"
//               name="end_time"
//               value={formData.end_time}
//               onChange={handleChange}
//               className="form-control"
//               id="end_time"
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="instructor_id">Instructor</label>
//             <select
//               name="instructor_id"
//               value={formData.instructor_id}
//               onChange={handleChange}
//               className="form-control"
//               id="instructor_id"
//               required
//             >
//               <option value="" disabled>
//                 Select an instructor
//               </option>
//               {instructors.map((instructor) => (
//                 <option key={instructor.ID} value={instructor.ID}>
//                   {instructor.firstName} {instructor.lastName}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <div className="form-group">
//             <label htmlFor="vehicleType">Vehicle Type</label>
//             <select
//               name="vehicleType"
//               value={formData.vehicleType}
//               onChange={handleChange}
//               className="form-control"
//               id="vehicleType"
//               required
//             >
//               <option value="" disabled>
//                 Select a vehicle
//               </option>
//               {instructorVehicles.map((vehicle) => (
//                 <option key={vehicle} value={vehicle}>
//                   {vehicle}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <button type="submit" className="btn btn-primary">
//             Create Session
//           </button>
//         </form>

//         <div style={{ maxWidth: "1100px", margin: "20px auto" }}>
//           <FullCalendar
//             plugins={[dayGridPlugin]}
//             events={sessions.map((driving_session) => ({
//               title: driving_session.session_name,
//               start: `${driving_session.session_date.split("T")[0]}T${
//                 driving_session.start_time
//               }`,
//               end: `${driving_session.session_date.split("T")[0]}T${
//                 driving_session.end_time
//               }`,
//               extendedProps: { driving_session },
//             }))}
//             eventContent={renderEventContent}
//             eventClick={handleEventClick}
//             headerToolbar={{
//               left: "prev,next today",
//               center: "title",
//               right: "dayGridMonth,dayGridWeek,dayGridDay",
//             }}
//             initialView="dayGridMonth"
//             height="auto"
//             style={{
//               borderRadius: "10px",
//               boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
//             }}
//           />
//         </div>

//         <Modal
//           open={modalOpen}
//           onClose={() => setModalOpen(false)}
//           aria-labelledby="modal-title"
//           aria-describedby="modal-description"
//         >
//           <Box
//             sx={{
//               p: 4,
//               backgroundColor: "white",
//               maxWidth: 500,
//               margin: "0 auto",
//               mt: "10%",
//               borderRadius: "10px",
//               boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
//             }}
//           >
//             <Typography
//               id="modal-title"
//               variant="h6"
//               component="h2"
//               style={{ marginBottom: "20px", textAlign: "center" }}
//             >
//               Students for {selectedSession?.title}
//             </Typography>
//             <List>
//               {students.map((student) => (
//                 <ListItem
//                   key={student.id}
//                   style={{
//                     padding: "10px 0",
//                     borderBottom: "1px solid #e0e0e0",
//                   }}
//                 >
//                   <ListItemText
//                     primary={student.firstName}
//                     secondary={student.email}
//                   />
//                 </ListItem>
//               ))}
//             </List>
//           </Box>
//         </Modal>
//         <Footer />
//         <Sidebar />
//       </div>
//     </div>
//   );
// }

// export default AdminView;
