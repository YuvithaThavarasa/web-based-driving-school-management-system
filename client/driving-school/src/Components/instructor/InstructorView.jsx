// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import FullCalendar from "@fullcalendar/react";
// import dayGridPlugin from "@fullcalendar/daygrid";
// import moment from "moment-timezone";
// import {
//   Modal,
//   Box,
//   Typography,
//   List,
//   ListItem,
//   ListItemText,
// } from "@mui/material";
// import InsSidebar from "./InsSidebar";

// function InstructorView() {
//   const [sessions, setSessions] = useState([]);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [students, setStudents] = useState([]);
//   const [selectedSession, setSelectedSession] = useState(null);

//   useEffect(() => {
//     const token = localStorage.getItem("token"); // Assuming you store the token in localStorage

//     axios
//       .get("http://localhost:5000/instructor/sessions", {
//         headers: {
//           "x-access-token": token,
//         },
//       })
//       .then((response) => {
//         console.log("Fetched sessions:", response.data); // Debugging log

//         const sessionData = response.data.map((driving_session) => ({
//           ...driving_session,
//           session_date: moment(driving_session.session_date)
//             .tz("Asia/Colombo")
//             .format(),
//         }));
//         console.log("Formatted session data:", sessionData); // Debugging log

//         setSessions(sessionData);
//       })
//       .catch((err) => console.error("Error fetching sessions:", err));
//   }, []);

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
//       </div>
//     );
//   };

//   return (
//     <div>
//       <div>
//         <h2>Instructor - View Allocated Sessions</h2>

//         <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
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
//             }}
//           >
//             <Typography id="modal-title" variant="h6" component="h2">
//               Students for {selectedSession?.title}
//             </Typography>
//             <List>
//               {students.map((student) => (
//                 <ListItem key={student.id}>
//                   <ListItemText
//                     primary={student.firstName}
//                     secondary={student.email}
//                   />
//                 </ListItem>
//               ))}
//             </List>
//           </Box>
//         </Modal>
//         <InsSidebar />
//       </div>
//     </div>
//   );
// }

// export default InstructorView;
import React, { useState, useEffect } from "react";
import axios from "axios";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import moment from "moment-timezone";
import {
  Modal,
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import InsSidebar from "./InsSidebar";

function InstructorView() {
  const [sessions, setSessions] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [students, setStudents] = useState([]);
  const [selectedSession, setSelectedSession] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token"); // Assuming you store the token in localStorage

    axios
      .get("http://localhost:5000/instructor/sessions", {
        headers: {
          "x-access-token": token,
        },
      })
      .then((response) => {
        console.log("Fetched sessions:", response.data); // Debugging log

        const sessionData = response.data.map((driving_session) => ({
          ...driving_session,
          session_date: moment(driving_session.session_date)
            .tz("Asia/Colombo")
            .format(),
        }));
        console.log("Formatted session data:", sessionData); // Debugging log

        setSessions(sessionData);
      })
      .catch((err) => console.error("Error fetching sessions:", err));
  }, []);

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

    const startTime = new Date(eventInfo.event.start).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    const endTime = new Date(eventInfo.event.end).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    return (
      <div
        style={{
          padding: "5px",
          backgroundColor: "#e3f2fd",
          borderRadius: "5px",
        }}
      >
        <b>
          {startTime} - {endTime}
        </b>
        <div>{eventInfo.event.title}</div>
      </div>
    );
  };

  return (
    <div
      style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}
    >
      <div
        style={{
          maxWidth: "1100px",
          margin: "20px auto",
          padding: "20px",
          backgroundColor: "#fff",
          borderRadius: "10px",
          boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
          Instructor - View Allocated Sessions
        </h2>
        <div style={{ marginBottom: "20px" }}>
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
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,dayGridWeek,dayGridDay",
            }}
            initialView="dayGridMonth"
            height="auto"
            style={{ borderRadius: "10px", overflow: "hidden" }}
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
              borderRadius: "10px",
              boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
            }}
          >
            <Typography
              id="modal-title"
              variant="h6"
              component="h2"
              style={{ marginBottom: "20px", textAlign: "center" }}
            >
              Students for {selectedSession?.title}
            </Typography>
            <List>
              {students.map((student) => (
                <ListItem
                  key={student.id}
                  style={{
                    padding: "10px 0",
                    borderBottom: "1px solid #e0e0e0",
                  }}
                >
                  <ListItemText
                    primary={student.firstName}
                    secondary={student.email}
                  />
                </ListItem>
              ))}
            </List>
          </Box>
        </Modal>
        <InsSidebar />
      </div>
    </div>
  );
}

export default InstructorView;
