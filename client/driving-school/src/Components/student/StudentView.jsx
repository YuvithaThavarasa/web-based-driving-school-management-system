// //before
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import FullCalendar from "@fullcalendar/react";
// import dayGridPlugin from "@fullcalendar/daygrid";
// import Footer from "../Layouts/Footer";
// import moment from "moment-timezone";
// import StuSidebar from "./StuSidebar";

// function StudentView() {
//   const [sessions, setSessions] = useState([]);
//   const [bookings, setBookings] = useState([]);

//   useEffect(() => {
//     axios
//       .get("http://localhost:5000/student/sessions", {
//         headers: {
//           "x-access-token": localStorage.getItem("token"),
//         },
//       })
//       .then((response) => {
//         const sessionData = response.data.map((session) => ({
//           ...session,
//           session_date: moment(session.session_date).format("YYYY-MM-DD"),
//         }));
//         setSessions(sessionData);
//       })
//       .catch((error) => {
//         console.error("Error fetching sessions:", error);
//       });

//     axios
//       .get("http://localhost:5000/student/bookings", {
//         headers: {
//           "x-access-token": localStorage.getItem("token"),
//         },
//       })
//       .then((response) => {
//         setBookings(response.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching bookings:", error);
//       });
//   }, []);

//   const handleSessionBooking = (sessionId) => {
//     if (window.confirm("Are you sure you want to book this session?")) {
//       axios
//         .post(
//           "http://localhost:5000/student/book-session",
//           { session_id: sessionId },
//           {
//             headers: {
//               "x-access-token": localStorage.getItem("token"),
//             },
//           }
//         )
//         .then((response) => {
//           setBookings([...bookings, response.data]);
//           setSessions(
//             sessions.map((session) =>
//               session.id === sessionId
//                 ? { ...session, is_booked: true }
//                 : session
//             )
//           );
//         })
//         .catch((error) => {
//           console.error("Error booking session:", error);
//         });
//     }
//   };

//   const handleBookingCancellation = (sessionId) => {
//     if (window.confirm("Are you sure you want to cancel this booking?")) {
//       axios
//         .post(
//           "http://localhost:5000/student/cancel-booking",
//           { session_id: sessionId },
//           {
//             headers: {
//               "x-access-token": localStorage.getItem("token"),
//             },
//           }
//         )
//         .then((response) => {
//           setBookings(
//             bookings.filter((booking) => booking.session_id !== sessionId)
//           );
//           setSessions(
//             sessions.map((session) =>
//               session.id === sessionId
//                 ? { ...session, is_booked: false }
//                 : session
//             )
//           );
//         })
//         .catch((error) => {
//           console.error("Error canceling booking:", error);
//         });
//     }
//   };

//   const renderEventContent = (eventInfo) => {
//     const { session } = eventInfo.event.extendedProps;

//     const startTime = moment(session.start_time, "HH:mm:ss").format("hh:mm A");
//     const endTime = moment(session.end_time, "HH:mm:ss").format("hh:mm A");
//     const sessionStart = moment(
//       `${session.session_date}T${session.start_time}`
//     );
//     const currentTime = moment();
//     const isBooked =
//       bookings.some((booking) => booking.session_id === session.id) ||
//       session.is_booked;

//     const isSessionFinished = currentTime.isAfter(
//       moment(`${session.session_date}T${session.end_time}`)
//     );
//     const isBookingAllowed = sessionStart.diff(currentTime, "hours") >= 1;

//     return (
//       <div>
//         <b>{session.session_name}</b>
//         <div>Start Time: {startTime}</div>
//         <div>End Time: {endTime}</div>
//         <div>Vehicle: {session ? session.vehicleType : "N/A"}</div>
//         {!isBooked ? (
//           <button
//             onClick={() => handleSessionBooking(session.id)}
//             disabled={!isBookingAllowed}
//           >
//             {isSessionFinished
//               ? "Session Finished"
//               : !isBookingAllowed
//               ? "Booking Closed"
//               : "Book Session"}
//           </button>
//         ) : (
//           <button
//             onClick={() => handleBookingCancellation(session.id)}
//             style={{ backgroundColor: "#ffcccc", color: "#000" }}
//             disabled={!isBookingAllowed}
//           >
//             Cancel Booking
//           </button>
//         )}
//       </div>
//     );
//   };

//   return (
//     <div>
//       <div>
//         <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
//           <FullCalendar
//             plugins={[dayGridPlugin]}
//             events={sessions.map((session) => ({
//               title: session.session_name,
//               start: `${session.session_date.split("T")[0]}T${
//                 session.start_time
//               }`,
//               end: `${session.session_date.split("T")[0]}T${session.end_time}`,
//               extendedProps: { session },
//             }))}
//             eventContent={renderEventContent}
//           />
//         </div>
//         <Footer />
//         <StuSidebar />
//       </div>
//     </div>
//   );
// }

// export default StudentView;

// //new
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import FullCalendar from "@fullcalendar/react";
// import dayGridPlugin from "@fullcalendar/daygrid";
// import Footer from "../Layouts/Footer";
// import moment from "moment-timezone";
// import StuSidebar from "./StuSidebar";

// function StudentView() {
//   const [sessions, setSessions] = useState([]);
//   const [bookings, setBookings] = useState([]);

//   useEffect(() => {
//     axios
//       .get("http://localhost:5000/student/sessions", {
//         headers: {
//           "x-access-token": localStorage.getItem("token"),
//         },
//       })
//       .then((response) => {
//         const sessionData = response.data.map((session) => ({
//           ...session,
//           session_date: moment(session.session_date).format("YYYY-MM-DD"),
//         }));
//         setSessions(sessionData);
//       })
//       .catch((error) => {
//         console.error("Error fetching sessions:", error);
//       });

//     axios
//       .get("http://localhost:5000/student/booked-sessions", {
//         headers: {
//           "x-access-token": localStorage.getItem("token"),
//         },
//       })
//       .then((response) => {
//         setBookings(response.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching bookings:", error);
//       });
//   }, []);

//   const handleSessionBooking = (sessionId) => {
//     if (window.confirm("Are you sure you want to book this session?")) {
//       axios
//         .post(
//           "http://localhost:5000/student/book-session",
//           { session_id: sessionId },
//           {
//             headers: {
//               "x-access-token": localStorage.getItem("token"),
//             },
//           }
//         )
//         .then((response) => {
//           setBookings([...bookings, response.data]);
//           setSessions(
//             sessions.map((session) =>
//               session.id === sessionId
//                 ? { ...session, is_booked: true }
//                 : session
//             )
//           );
//         })
//         .catch((error) => {
//           console.error("Error booking session:", error);
//         });
//     }
//   };

//   const handleBookingCancellation = (sessionId) => {
//     if (window.confirm("Are you sure you want to cancel this booking?")) {
//       axios
//         .post(
//           "http://localhost:5000/student/cancel-booking",
//           { session_id: sessionId },
//           {
//             headers: {
//               "x-access-token": localStorage.getItem("token"),
//             },
//           }
//         )
//         .then((response) => {
//           setBookings(
//             bookings.filter((booking) => booking.session_id !== sessionId)
//           );
//           setSessions(
//             sessions.map((session) =>
//               session.id === sessionId
//                 ? { ...session, is_booked: false }
//                 : session
//             )
//           );
//         })
//         .catch((error) => {
//           console.error("Error canceling booking:", error);
//         });
//     }
//   };

//   const renderEventContent = (eventInfo) => {
//     const { session } = eventInfo.event.extendedProps;

//     const startTime = moment(session.start_time, "HH:mm:ss").format("hh:mm A");
//     const endTime = moment(session.end_time, "HH:mm:ss").format("hh:mm A");
//     const sessionStart = moment(
//       `${session.session_date}T${session.start_time}`
//     );
//     const currentTime = moment();
//     const isBooked =
//       bookings.some((booking) => booking.session_id === session.id) ||
//       session.is_booked;

//     const isSessionFinished = currentTime.isAfter(
//       moment(`${session.session_date}T${session.end_time}`)
//     );
//     const isBookingAllowed = sessionStart.diff(currentTime, "hours") >= 1;

//     return (
//       <div>
//         <b>{session.session_name}</b>
//         <div>Start Time: {startTime}</div>
//         <div>End Time: {endTime}</div>
//         {!isBooked ? (
//           <button
//             onClick={() => handleSessionBooking(session.id)}
//             disabled={!isBookingAllowed}
//           >
//             {isSessionFinished
//               ? "Session Finished"
//               : !isBookingAllowed
//               ? "Booking Closed"
//               : "Book Session"}
//           </button>
//         ) : (
//           <button
//             onClick={() => handleBookingCancellation(session.id)}
//             style={{ backgroundColor: "#ffcccc", color: "#000" }}
//             disabled={!isBookingAllowed}
//           >
//             Cancel Booking
//           </button>
//         )}
//       </div>
//     );
//   };

//   return (
//     <div>
//       <div>
//         <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
//           <FullCalendar
//             plugins={[dayGridPlugin]}
//             events={sessions.map((session) => ({
//               title: session.session_name,
//               start: `${session.session_date.split("T")[0]}T${
//                 session.start_time
//               }`,
//               end: `${session.session_date.split("T")[0]}T${session.end_time}`,
//               extendedProps: { session },
//             }))}
//             eventContent={renderEventContent}
//           />
//         </div>
//         <Footer />
//         <StuSidebar />
//       </div>
//     </div>
//   );
// }

// export default StudentView;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import FullCalendar from "@fullcalendar/react";
// import dayGridPlugin from "@fullcalendar/daygrid";
// import Footer from "../Layouts/Footer";
// import moment from "moment-timezone";
// import StuSidebar from "./StuSidebar";

// function StudentView() {
//   const [sessions, setSessions] = useState([]);
//   const [bookings, setBookings] = useState([]);

//   useEffect(() => {
//     axios
//       .get("http://localhost:5000/student/sessions", {
//         headers: {
//           "x-access-token": localStorage.getItem("token"),
//         },
//       })
//       .then((response) => {
//         const sessionData = response.data.map((session) => ({
//           ...session,
//           session_date: moment(session.session_date).format("YYYY-MM-DD"),
//         }));
//         setSessions(sessionData);
//       })
//       .catch((error) => {
//         console.error("Error fetching sessions:", error);
//       });

//     axios
//       .get("http://localhost:5000/student/booked-sessions", {
//         headers: {
//           "x-access-token": localStorage.getItem("token"),
//         },
//       })
//       .then((response) => {
//         setBookings(response.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching bookings:", error);
//       });
//   }, []);

//   const handleSessionBooking = (sessionId) => {
//     if (window.confirm("Are you sure you want to book this session?")) {
//       axios
//         .post(
//           "http://localhost:5000/student/book-session",
//           { session_id: sessionId },
//           {
//             headers: {
//               "x-access-token": localStorage.getItem("token"),
//             },
//           }
//         )
//         .then((response) => {
//           setBookings([...bookings, response.data]);
//           setSessions(
//             sessions.map((session) =>
//               session.id === sessionId
//                 ? { ...session, is_booked: true }
//                 : session
//             )
//           );
//         })
//         .catch((error) => {
//           console.error("Error booking session:", error);
//           alert(error.response.data.error);
//         });
//     }
//   };

//   const handleBookingCancellation = (sessionId) => {
//     if (window.confirm("Are you sure you want to cancel this booking?")) {
//       axios
//         .post(
//           "http://localhost:5000/student/cancel-booking",
//           { session_id: sessionId },
//           {
//             headers: {
//               "x-access-token": localStorage.getItem("token"),
//             },
//           }
//         )
//         .then((response) => {
//           setBookings(
//             bookings.filter((booking) => booking.session_id !== sessionId)
//           );
//           setSessions(
//             sessions.map((session) =>
//               session.id === sessionId
//                 ? { ...session, is_booked: false }
//                 : session
//             )
//           );
//         })
//         .catch((error) => {
//           console.error("Error canceling booking:", error);
//         });
//     }
//   };

//   const renderEventContent = (eventInfo) => {
//     const { session } = eventInfo.event.extendedProps;

//     const startTime = moment(session.start_time, "HH:mm:ss").format("hh:mm A");
//     const endTime = moment(session.end_time, "HH:mm:ss").format("hh:mm A");
//     const sessionStart = moment(
//       `${session.session_date}T${session.start_time}`
//     );
//     const currentTime = moment();
//     const isBooked =
//       bookings.some((booking) => booking.session_id === session.id) ||
//       session.is_booked;

//     const isSessionFinished = currentTime.isAfter(
//       moment(`${session.session_date}T${session.end_time}`)
//     );
//     const isBookingAllowed = sessionStart.diff(currentTime, "hours") >= 1;

//     return (
//       <div>
//         <b>{session.session_name}</b>
//         <div>Start Time: {startTime}</div>
//         <div>End Time: {endTime}</div>
//         <div>Vehicle: {session ? session.vehicleType : "N/A"}</div>
//         {!isBooked ? (
//           <button
//             onClick={() => handleSessionBooking(session.id)}
//             disabled={!isBookingAllowed}
//           >
//             {isSessionFinished
//               ? "Session Finished"
//               : !isBookingAllowed
//               ? "Booking Closed"
//               : "Book Session"}
//           </button>
//         ) : (
//           <button
//             onClick={() => handleBookingCancellation(session.id)}
//             style={{ backgroundColor: "#ffcccc", color: "#000" }}
//             disabled={!isBookingAllowed}
//           >
//             Cancel Booking
//           </button>
//         )}
//       </div>
//     );
//   };

//   return (
//     <div>
//       <div>
//         <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
//           <FullCalendar
//             plugins={[dayGridPlugin]}
//             events={sessions.map((session) => ({
//               title: session.session_name,
//               start: `${session.session_date.split("T")[0]}T${
//                 session.start_time
//               }`,
//               end: `${session.session_date.split("T")[0]}T${session.end_time}`,
//               extendedProps: { session },
//             }))}
//             eventContent={renderEventContent}
//           />
//         </div>
//         <Footer />
//         <StuSidebar />
//       </div>
//     </div>
//   );
// }

// export default StudentView;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import FullCalendar from "@fullcalendar/react";
// import dayGridPlugin from "@fullcalendar/daygrid";
// import Footer from "../Layouts/Footer";
// import moment from "moment-timezone";
// import StuSidebar from "./StuSidebar";

// function StudentView() {
//   const [sessions, setSessions] = useState([]);
//   const [bookings, setBookings] = useState([]);

//   useEffect(() => {
//     axios
//       .get("http://localhost:5000/student/sessions", {
//         headers: {
//           "x-access-token": localStorage.getItem("token"),
//         },
//       })
//       .then((response) => {
//         const sessionData = response.data.map((session) => ({
//           ...session,
//           session_date: moment(session.session_date).format("YYYY-MM-DD"),
//         }));
//         setSessions(sessionData);
//       })
//       .catch((error) => {
//         console.error("Error fetching sessions:", error);
//       });

//     axios
//       .get("http://localhost:5000/student/booked-sessions", {
//         headers: {
//           "x-access-token": localStorage.getItem("token"),
//         },
//       })
//       .then((response) => {
//         setBookings(response.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching bookings:", error);
//       });
//   }, []);

//   const handleSessionBooking = (sessionId) => {
//     if (window.confirm("Are you sure you want to book this session?")) {
//       axios
//         .post(
//           "http://localhost:5000/student/book-session",
//           { session_id: sessionId },
//           {
//             headers: {
//               "x-access-token": localStorage.getItem("token"),
//             },
//           }
//         )
//         .then((response) => {
//           setBookings([...bookings, response.data]);
//           setSessions(
//             sessions.map((session) =>
//               session.id === sessionId
//                 ? { ...session, is_booked: true }
//                 : session
//             )
//           );
//         })
//         .catch((error) => {
//           console.error("Error booking session:", error);
//           alert(error.response.data.error);
//         });
//     }
//   };

//   const handleBookingCancellation = (sessionId) => {
//     if (window.confirm("Are you sure you want to cancel this booking?")) {
//       axios
//         .post(
//           "http://localhost:5000/student/cancel-booking",
//           { session_id: sessionId },
//           {
//             headers: {
//               "x-access-token": localStorage.getItem("token"),
//             },
//           }
//         )
//         .then((response) => {
//           setBookings(
//             bookings.filter((booking) => booking.session_id !== sessionId)
//           );
//           setSessions(
//             sessions.map((session) =>
//               session.id === sessionId
//                 ? { ...session, is_booked: false }
//                 : session
//             )
//           );
//         })
//         .catch((error) => {
//           console.error("Error canceling booking:", error);
//         });
//     }
//   };

//   const renderEventContent = (eventInfo) => {
//     const { session } = eventInfo.event.extendedProps;

//     const startTime = moment(session.start_time, "HH:mm:ss").format("hh:mm A");
//     const endTime = moment(session.end_time, "HH:mm:ss").format("hh:mm A");
//     const sessionStart = moment(
//       `${session.session_date}T${session.start_time}`
//     );
//     const currentTime = moment();
//     const isBooked = session.is_booked;

//     const isSessionFinished = currentTime.isAfter(
//       moment(`${session.session_date}T${session.end_time}`)
//     );
//     const isBookingAllowed = sessionStart.diff(currentTime, "hours") >= 1;

//     return (
//       <div>
//         <b>{session.session_name}</b>
//         <div>Start Time: {startTime}</div>
//         <div>End Time: {endTime}</div>
//         <div>Vehicle: {session ? session.vehicleType : "N/A"}</div>{" "}
//         {!isBooked ? (
//           <button
//             onClick={() => handleSessionBooking(session.id)}
//             disabled={!isBookingAllowed}
//           >
//             {isSessionFinished
//               ? "Session Finished"
//               : !isBookingAllowed
//               ? "Booking Closed"
//               : "Book Session"}
//           </button>
//         ) : (
//           <button
//             onClick={() => handleBookingCancellation(session.id)}
//             style={{ backgroundColor: "#ffcccc", color: "#000" }}
//             disabled={!isBookingAllowed}
//           >
//             Cancel Booking
//           </button>
//         )}
//       </div>
//     );
//   };

//   return (
//     <div>
//       <div>
//         <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
//           <FullCalendar
//             plugins={[dayGridPlugin]}
//             events={sessions.map((session) => ({
//               title: session.session_name,
//               start: `${session.session_date.split("T")[0]}T${
//                 session.start_time
//               }`,
//               end: `${session.session_date.split("T")[0]}T${session.end_time}`,
//               extendedProps: { session },
//             }))}
//             eventContent={renderEventContent}
//           />
//         </div>
//         <Footer />
//         <StuSidebar />
//       </div>
//     </div>
//   );
// }

// export default StudentView;

//before styling

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import FullCalendar from "@fullcalendar/react";
// import dayGridPlugin from "@fullcalendar/daygrid";
// import Footer from "../Layouts/Footer";
// import moment from "moment-timezone";
// import StuSidebar from "./StuSidebar";

// function StudentView() {
//   const [sessions, setSessions] = useState([]);
//   const [bookings, setBookings] = useState([]);

//   useEffect(() => {
//     const fetchSessions = axios.get("http://localhost:5000/student/sessions", {
//       headers: { "x-access-token": localStorage.getItem("token") },
//     });

//     const fetchBookings = axios.get(
//       "http://localhost:5000/student/booked-sessions",
//       {
//         headers: { "x-access-token": localStorage.getItem("token") },
//       }
//     );

//     Promise.all([fetchSessions, fetchBookings])
//       .then((responses) => {
//         const sessionData = responses[0].data.map((session) => ({
//           ...session,
//           session_date: moment(session.session_date).format("YYYY-MM-DD"),
//         }));
//         const bookingData = responses[1].data;

//         setSessions(sessionData);
//         setBookings(bookingData);
//       })
//       .catch((error) => {
//         console.error("Error fetching sessions and bookings:", error);
//       });
//   }, []);

//   const handleSessionBooking = (sessionId) => {
//     if (window.confirm("Are you sure you want to book this session?")) {
//       axios
//         .post(
//           "http://localhost:5000/student/book-session",
//           { session_id: sessionId },
//           {
//             headers: { "x-access-token": localStorage.getItem("token") },
//           }
//         )
//         .then((response) => {
//           setBookings([...bookings, response.data]);
//           setSessions(
//             sessions.map((session) =>
//               session.id === sessionId
//                 ? { ...session, is_booked: true }
//                 : session
//             )
//           );
//         })
//         .catch((error) => {
//           console.error("Error booking session:", error);
//           alert(error.response.data.error);
//         });
//     }
//   };

//   const handleBookingCancellation = (sessionId) => {
//     if (window.confirm("Are you sure you want to cancel this booking?")) {
//       axios
//         .post(
//           "http://localhost:5000/student/cancel-booking",
//           { session_id: sessionId },
//           {
//             headers: { "x-access-token": localStorage.getItem("token") },
//           }
//         )
//         .then((response) => {
//           setBookings(
//             bookings.filter((booking) => booking.session_id !== sessionId)
//           );
//           setSessions(
//             sessions.map((session) =>
//               session.id === sessionId
//                 ? { ...session, is_booked: false }
//                 : session
//             )
//           );
//         })
//         .catch((error) => {
//           console.error("Error canceling booking:", error);
//         });
//     }
//   };

//   const renderEventContent = (eventInfo) => {
//     const { session } = eventInfo.event.extendedProps;

//     const startTime = moment(session.start_time, "HH:mm:ss").format("hh:mm A");
//     const endTime = moment(session.end_time, "HH:mm:ss").format("hh:mm A");
//     const sessionStart = moment(
//       `${session.session_date}T${session.start_time}`
//     );
//     const currentTime = moment();
//     const isBooked = session.is_booked;

//     const isSessionFinished = currentTime.isAfter(
//       moment(`${session.session_date}T${session.end_time}`)
//     );
//     const isBookingAllowed = sessionStart.diff(currentTime, "hours") >= 1;

//     return (
//       <div>
//         <b>{session.session_name}</b>
//         <div>Start Time: {startTime}</div>
//         <div>End Time: {endTime}</div>
//         <div>Vehicle: {session ? session.vehicleType : "N/A"}</div>{" "}
//         {!isBooked ? (
//           <button
//             onClick={() => handleSessionBooking(session.id)}
//             disabled={!isBookingAllowed}
//           >
//             {isSessionFinished
//               ? "Session Finished"
//               : !isBookingAllowed
//               ? "Booking Closed"
//               : "Book Session"}
//           </button>
//         ) : (
//           <button
//             onClick={() => handleBookingCancellation(session.id)}
//             style={{ backgroundColor: "#ffcccc", color: "#000" }}
//             disabled={!isBookingAllowed}
//           >
//             Cancel Booking
//           </button>
//         )}
//       </div>
//     );
//   };

//   return (
//     <div>
//       <div>
//         <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
//           <FullCalendar
//             plugins={[dayGridPlugin]}
//             events={sessions.map((session) => ({
//               title: session.session_name,
//               start: `${session.session_date.split("T")[0]}T${
//                 session.start_time
//               }`,
//               end: `${session.session_date.split("T")[0]}T${session.end_time}`,
//               extendedProps: { session },
//             }))}
//             eventContent={renderEventContent}
//           />
//         </div>
//         <Footer />
//         <StuSidebar />
//       </div>
//     </div>
//   );
// }

// export default StudentView;

import React, { useState, useEffect } from "react";
import axios from "axios";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import Footer from "../Layouts/Footer";
import moment from "moment-timezone";
import StuSidebar from "./StuSidebar";

function StudentView() {
  const [sessions, setSessions] = useState([]);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchSessions = axios.get("http://localhost:5000/student/sessions", {
      headers: { "x-access-token": localStorage.getItem("token") },
    });

    const fetchBookings = axios.get(
      "http://localhost:5000/student/booked-sessions",
      {
        headers: { "x-access-token": localStorage.getItem("token") },
      }
    );

    Promise.all([fetchSessions, fetchBookings])
      .then((responses) => {
        const sessionData = responses[0].data.map((session) => ({
          ...session,
          session_date: moment(session.session_date).format("YYYY-MM-DD"),
        }));
        const bookingData = responses[1].data;

        setSessions(sessionData);
        setBookings(bookingData);
      })
      .catch((error) => {
        console.error("Error fetching sessions and bookings:", error);
      });
  }, []);

  const handleSessionBooking = (sessionId) => {
    if (window.confirm("Are you sure you want to book this session?")) {
      axios
        .post(
          "http://localhost:5000/student/book-session",
          { session_id: sessionId },
          {
            headers: { "x-access-token": localStorage.getItem("token") },
          }
        )
        .then((response) => {
          setBookings([...bookings, response.data]);
          setSessions(
            sessions.map((session) =>
              session.id === sessionId
                ? { ...session, is_booked: true }
                : session
            )
          );
        })
        .catch((error) => {
          console.error("Error booking session:", error);
          alert(error.response.data.error);
        });
    }
  };

  const handleBookingCancellation = (sessionId) => {
    if (window.confirm("Are you sure you want to cancel this booking?")) {
      axios
        .post(
          "http://localhost:5000/student/cancel-booking",
          { session_id: sessionId },
          {
            headers: { "x-access-token": localStorage.getItem("token") },
          }
        )
        .then((response) => {
          setBookings(
            bookings.filter((booking) => booking.session_id !== sessionId)
          );
          setSessions(
            sessions.map((session) =>
              session.id === sessionId
                ? { ...session, is_booked: false }
                : session
            )
          );
        })
        .catch((error) => {
          console.error("Error canceling booking:", error);
        });
    }
  };

  const renderEventContent = (eventInfo) => {
    const { session } = eventInfo.event.extendedProps;

    const startTime = moment(session.start_time, "HH:mm:ss").format("hh:mm A");
    const endTime = moment(session.end_time, "HH:mm:ss").format("hh:mm A");
    const sessionStart = moment(
      `${session.session_date}T${session.start_time}`
    );
    const currentTime = moment();
    const isBooked = session.is_booked;

    const isSessionFinished = currentTime.isAfter(
      moment(`${session.session_date}T${session.end_time}`)
    );
    const isBookingAllowed = sessionStart.diff(currentTime, "hours") >= 1;

    return (
      <div
        style={{
          padding: "10px",
          backgroundColor: "#f9f9f9",
          borderRadius: "5px",
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
        }}
      >
        <b style={{ color: "#333", fontSize: "16px" }}>
          {session.session_name}
        </b>
        <div>Start Time: {startTime}</div>
        <div>End Time: {endTime}</div>
        <div>Vehicle: {session ? session.vehicleType : "N/A"}</div>
        {!isBooked ? (
          <button
            onClick={() => handleSessionBooking(session.id)}
            style={{
              marginTop: "10px",
              padding: "5px 10px",
              backgroundColor: "#4CAF50",
              color: "white",
              border: "none",
              borderRadius: "3px",
              cursor: "pointer",
              opacity: !isBookingAllowed ? 0.5 : 1,
            }}
            disabled={!isBookingAllowed}
          >
            {isSessionFinished
              ? "Session Finished"
              : !isBookingAllowed
              ? "Booking Closed"
              : "Book Session"}
          </button>
        ) : (
          <button
            onClick={() => handleBookingCancellation(session.id)}
            style={{
              marginTop: "10px",
              padding: "5px 10px",
              backgroundColor: "#ffcccc",
              color: "#000",
              border: "none",
              borderRadius: "3px",
              cursor: "pointer",
            }}
            disabled={!isBookingAllowed}
          >
            Cancel Booking
          </button>
        )}
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
        <FullCalendar
          plugins={[dayGridPlugin]}
          events={sessions.map((session) => ({
            title: session.session_name,
            start: `${session.session_date.split("T")[0]}T${
              session.start_time
            }`,
            end: `${session.session_date.split("T")[0]}T${session.end_time}`,
            extendedProps: { session },
          }))}
          eventContent={renderEventContent}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,dayGridWeek,dayGridDay",
          }}
          initialView="dayGridMonth"
          height="auto"
        />
      </div>
      <Footer />
      <StuSidebar />
    </div>
  );
}

export default StudentView;
