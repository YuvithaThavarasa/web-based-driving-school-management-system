/*import express from 'express';
import mysql from 'mysql'
import cors from 'cors'
import jwt from "jsonwebtoken";
import bycrypt from "bycrypt";
import cookieParser from "cookie-parser";*/

const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const path = require("path");
const multer = require("multer");
const router = express.Router();

//const salt = 10;

const port = 5000;

app.use(cookieParser());
app.use(express.json());
//const multer = require("multer");
//app.use(express.urlencoded({ extended: true }));

//const upload = multer({ dest: "uploads/" });

app.use(cors());

const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const corsOptions = {
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, "public")));
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["POST", "GET"],
    credentials: true,
  })
);
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "finalyear_project",
});

// Connect
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("MySQL connected");
});

const saltRounds = 10; // Number of salt rounds for bcrypt hashing

const { v4: uuidv4 } = require("uuid");

app.post("/admin/register", (req, res) => {
  const { email, password, role } = req.body;

  // Generate UUID for the id column
  const id = uuidv4();

  // Hash the password
  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      console.error("Error for hashing password:", err);
      return res.status(500).json({ error: "Error for hashing password" });
    }

    // Insert user data into the database
    const insertQuery =
      "INSERT INTO login (id, email, password, role) VALUES (?, ?, ?, ?)";
    const values = [id, email, hash, role];
    db.query(insertQuery, values, (err, result) => {
      if (err) {
        console.error("Error inserting data:", err);
        return res.status(500).json({ error: "Error inserting data" });
      }

      // User successfully registered
      return res.status(200).json({ status: "Success" });
    });
  });
});

// app.post("/login", (req, res) => {
//   const sql = `
//     SELECT login.*, instructor.ID AS instructor_id
//     FROM login
//     LEFT JOIN instructor ON login.id = instructor.login_id
//     WHERE login.email = ?`; // Specify the table name for the email column
//   db.query(sql, [req.body.email], (err, data) => {
//     if (err) {
//       console.error("Database query error:", err);
//       return res.json({ Error: "Login error in server", details: err.message });
//     }
//     if (data.length > 0) {
//       bcrypt.compare(
//         req.body.password.toString(),
//         data[0].password,
//         (err, response) => {
//           if (err) {
//             console.error("Password compare error:", err);
//             return res.json({
//               Error: "Password compare error",
//               details: err.message,
//             });
//           }
//           if (response) {
//             const user = {
//               id: data[0].id,
//               instructor_id: data[0].instructor_id || null, // Ensure this field is included
//               username: data[0].username,
//               role: data[0].role,
//             };
//             const token = jwt.sign(user, "jwt-secret-key", { expiresIn: "1d" });
//             res.cookie("token", token, { httpOnly: true });
//             return res.json({
//               status: "Success",
//               token,
//               role: user.role,
//               instructor_id: user.instructor_id,
//             });
//           } else {
//             return res.json({ Error: "Password doesn't match" });
//           }
//         }
//       );
//     } else {
//       return res.json({ Error: "No email existed" });
//     }
//   });
// });

app.post("/login", (req, res) => {
  const sql = `
    SELECT login.*, instructor.ID AS instructor_id, student.ID AS student_id 
    FROM login 
    LEFT JOIN instructor ON login.id = instructor.login_id 
    LEFT JOIN student ON login.id = student.login_id 
    WHERE login.email = ?`;

  db.query(sql, [req.body.email], (err, data) => {
    if (err) {
      console.error("Database query error:", err);
      return res.json({ Error: "Login error in server", details: err.message });
    }
    if (data.length > 0) {
      bcrypt.compare(
        req.body.password.toString(),
        data[0].password,
        (err, response) => {
          if (err) {
            console.error("Password compare error:", err);
            return res.json({
              Error: "Password compare error",
              details: err.message,
            });
          }
          if (response) {
            const user = {
              id: data[0].id,
              instructor_id: data[0].instructor_id || null,
              student_id: data[0].student_id || null,
              username: data[0].username,
              role: data[0].role,
            };
            const token = jwt.sign(user, "jwt-secret-key", { expiresIn: "1d" });
            res.cookie("token", token, { httpOnly: true });
            return res.json({
              status: "Success",
              token,
              role: user.role,
              instructor_id: user.instructor_id,
              student_id: user.student_id,
            });
          } else {
            return res.json({ Error: "Password doesn't match" });
          }
        }
      );
    } else {
      return res.json({ Error: "No email existed" });
    }
  });
});

// // Middleware to verify token
// function verifyToken(req, res, next) {
//   const token = req.headers["x-access-token"];
//   if (!token) {
//     return res.status(403).send({ auth: false, message: "No token provided." });
//   }

//   jwt.verify(token, "jwt-secret-key", (err, decoded) => {
//     if (err) {
//       return res
//         .status(500)
//         .send({ auth: false, message: "Failed to authenticate token." });
//     }
//     console.log("Decoded token:", decoded); // Debugging log to check the decoded token
//     req.userId = decoded.id;
//     req.instructorId = decoded.instructor_id; // This can be null
//     req.userRole = decoded.role;
//     next();
//   });
// }

function verifyToken(req, res, next) {
  const token = req.headers["x-access-token"];
  if (!token) {
    return res.status(403).send({ auth: false, message: "No token provided." });
  }

  jwt.verify(token, "jwt-secret-key", (err, decoded) => {
    if (err) {
      return res
        .status(500)
        .send({ auth: false, message: "Failed to authenticate token." });
    }
    console.log("Decoded token:", decoded);
    req.userId = decoded.id;
    req.instructorId = decoded.instructor_id; // This can be null
    req.studentId = decoded.student_id; // This can be null
    req.userRole = decoded.role;
    next();
  });
}

module.exports = verifyToken;

// Route to get a specific student by ID
app.get("/admin/student/:id", (req, res) => {
  const studentId = req.params.id;
  const sql = "SELECT * FROM student WHERE ID = ?";

  db.query(sql, [studentId], (err, result) => {
    if (err) {
      console.error("Error fetching student:", err);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
    if (result.length === 0) {
      res.status(404).json({ error: "Student not found" });
      return;
    }
    res.json(result[0]);
  });
});

// Get all students
app.get("/admin/student", (req, res) => {
  const sql = "SELECT * FROM student";
  db.query(sql, (err, data) => {
    if (err) {
      console.error("Error fetching students:", err);
      return res.status(500).json({ error: "Error fetching students" });
    }
    return res.status(200).json(data);
  });
});

// Get student details
app.get("admin/student/:id", (req, res) => {
  const studentId = req.params.id;
  const query = "SELECT * FROM students WHERE ID = ?";
  db.query(query, [studentId], (error, results) => {
    if (error) {
      console.error("Error fetching student:", error);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
    res.json(results[0]);
  });
});

// Update student details
app.put("/admin/student/:id", (req, res) => {
  const studentId = req.params.id;
  const {
    firstName,
    lastName,
    dob,
    addressLine1,
    addressLine2,
    addressLine3,
    email,
    phoneNumber,
  } = req.body;

  const query =
    "UPDATE student SET firstName = ?, lastName = ?, dob = ?, addressLine1 = ?, addressLine2 = ?, addressLine3 = ?, email = ?, phoneNumber = ? WHERE ID = ?";

  db.query(
    query,
    [
      firstName,
      lastName,
      dob,
      addressLine1,
      addressLine2,
      addressLine3,
      email,
      phoneNumber,
      studentId,
    ],
    (error, results) => {
      if (error) {
        console.error("Error updating student:", error);
        res.status(500).json({ error: "Internal Server Error" });
        return;
      }
      res.json({ message: "Student details updated successfully" });
    }
  );
});

// Serve static files from the "uploads" directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

//get registered students
app.get("/admin/registered-students", (req, res) => {
  const sql = `
    SELECT reg_students.*, student.firstName, student.lastName, student.dob, 
           student.addressLine1, student.addressLine2, student.addressLine3, 
           student.email, student.phoneNumber, student.nicNumber, student.gender 
    FROM reg_students 
    LEFT JOIN student ON reg_students.studentId = student.ID;`;
  db.query(sql, (err, data) => {
    if (err) {
      console.error("Error fetching students:", err);
      return res.status(500).json({ error: "Error fetching students" });
    }
    return res.status(200).json(data);
  });
});

// Insert a new student
app.post("/registrationform", (req, res) => {
  const {
    firstName,
    lastName,
    dob,
    addressLine1,
    addressLine2,
    addressLine3,
    email,
    phoneNumber,
    nicNumber,
    gender,
  } = req.body;

  const sql =
    "INSERT INTO student (firstName, lastName, dob, addressLine1, addressLine2, addressLine3, email, phoneNumber, nicNumber, gender) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
  const values = [
    firstName,
    lastName,
    dob,
    addressLine1,
    addressLine2,
    addressLine3,
    email,
    phoneNumber,
    nicNumber,
    gender,
  ];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error inserting student:", err); // Improved logging
      return res
        .status(500)
        .json({ error: "Error inserting student", details: err.message }); // Improved error response
    }
    return res
      .status(201)
      .json({ message: "Student added successfully", data: result });
  });
});

// Update student profile
app.put("/student/profile/:id", (req, res) => {
  const { id } = req.params;
  const { addressLine1, addressLine2, addressLine3, email, phoneNumber } =
    req.body;

  const sql = `
    UPDATE student 
    SET addressLine1 = ?, addressLine2 = ?, addressLine3 = ?, email = ?, phoneNumber = ?
    WHERE ID = ?`;

  db.query(
    sql,
    [addressLine1, addressLine2, addressLine3, email, phoneNumber, id],
    (err, result) => {
      if (err) {
        console.error("Error updating student profile:", err);
        return res
          .status(500)
          .json({ error: "Error updating student profile" });
      }
      return res
        .status(200)
        .json({ message: "Student profile updated successfully" });
    }
  );
});

/*
app.delete("student/remove/:id", (req, res) => {
  const sql = "DELETE FROM student WHERE `ID` = ?";
  const id = req.params.id;

  db.query(sql, [id], (err, data) => {
    if (err) return res.json("Error");
    return res.json(data);
  });
});
*/

// Endpoint to add a new instructor
app.post("/admin/instructorreg", (req, res) => {
  const {
    firstName,
    lastName,
    dob,
    email,
    phoneNumber,
    nicNumber,
    gender,
    vehicles,
  } = req.body;

  const vehiclesJSON = JSON.stringify(vehicles); // Convert array to JSON string

  const query =
    "INSERT INTO instructor (firstName, lastName, dob, email, phoneNumber, nicNumber, gender, vehicles) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
  const values = [
    firstName,
    lastName,
    dob,
    email,
    phoneNumber,
    nicNumber,
    gender,
    vehiclesJSON,
  ];

  db.query(query, values, (err, results) => {
    if (err) {
      console.error("Error inserting instructor:", err);
      res.status(500).send("Error inserting instructor");
      return;
    }
    res.status(201).send("Instructor added successfully");
  });
});

// Endpoint to get all instructors
app.get("/admin/instructor", (req, res) => {
  const query = "SELECT * FROM instructor";

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching instructors:", err);
      res.status(500).send("Error fetching instructors");
      return;
    }
    res.status(200).json(results);
  });
});

// Endpoint to fetch instructors
app.get("/admin/instructor", (req, res) => {
  const query = "SELECT * FROM instructors";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching instructors:", err);
      return res.status(500).send("Server error");
    }
    res.status(200).json(results);
  });
});

// // Route to create a new driving class
// app.post("/admin/schedule", (req, res) => {
//   const { startDate, endDate, student, course, instructor, vehicle } = req.body;
//   const sql =
//     "INSERT INTO classes (startDate, endDate, student, course, instructor, vehicle) VALUES (?, ?, ?, ?, ?, ?)";
//   const values = [startDate, endDate, student, course, instructor, vehicle];

//   db.query(sql, values, (err, result) => {
//     if (err) {
//       console.error("Error creating session: ", err);
//       res.status(500).send("Error creating session");
//       return;
//     }
//     console.log("Session created successfully");
//     res.status(201).send("Session created successfully");
//   });
// });

// // Route to get all driving classes
// app.get("/admin/schedule", (req, res) => {
//   const sql = `SELECT * FROM session`;
//   connection.query(sql, (err, rows) => {
//     if (err) {
//       console.error("Error fetching sessions: ", err);
//       res.status(500).send("Error fetching sessions");
//       return;
//     }
//     res.send(rows);
//   });
// });

// // Update instructor by ID
// router.put("/:id", (req, res) => {
//   const { id } = req.params;
//   const {
//     firstName,
//     lastName,
//     dob,
//     email,
//     phoneNumber,
//     nicNumber,
//     gender,
//     vehicles,
//   } = req.body;

//   const query =
//     "UPDATE instructor SET firstName = ?, lastName = ?, dob = ?, email = ?, phoneNumber = ?, nicNumber = ?, gender = ?, vehicles = ? WHERE ID = ?";
//   const values = [
//     firstName,
//     lastName,
//     dob,
//     email,
//     phoneNumber,
//     nicNumber,
//     gender,
//     JSON.stringify(vehicles), // Store vehicles as JSON string
//     id,
//   ];

//   db.query(query, values, (err, results) => {
//     if (err) {
//       console.error("Error updating instructor:", err);
//       res.status(500).send("Error updating instructor");
//       return;
//     }
//     res.status(200).send("Instructor updated successfully");
//   });
// });

// module.exports = router;

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Save files in the "uploads" directory
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Append timestamp to file name
  },
});

const upload = multer({ storage });

// Route to accept student
app.post(
  "/admin/acceptstudent/:id",
  upload.fields([{ name: "medicalCertificate" }, { name: "nicCopy" }]),
  (req, res) => {
    const { vehicles, amountPaid, days, registeredDate } = req.body;
    const medicalCertificate = req.files.medicalCertificate[0].filename;
    const nicCopy = req.files.nicCopy[0].filename;
    const studentId = req.params.id;

    const query =
      "INSERT INTO reg_students (studentId, vehicles, amountPaid, days, medicalCertificate, nicCopy, registered_date) VALUES (?, ?, ?, ?, ?, ?, ?)";

    db.query(
      query,
      [
        studentId,
        vehicles,
        amountPaid,
        days,
        medicalCertificate,
        nicCopy,
        registeredDate,
      ],
      (error, results) => {
        if (error) {
          console.error("Error inserting into reg_students:", error);
          res.status(500).json({ error: "Internal Server Error" });
          return;
        }

        // Update the student's accepted status
        const updateStudentQuery =
          "UPDATE student SET accepted = TRUE WHERE id = ?";
        db.query(updateStudentQuery, [studentId], (error, results) => {
          if (error) {
            console.error("Error updating student status:", error);
            res.status(500).json({ error: "Internal Server Error" });
            return;
          }

          res.status(200).json({ message: "Student accepted successfully" });
        });
      }
    );
  }
);

//fetch vehicles
app.get("/admin/fleet", (req, res) => {
  const sql = "SELECT * FROM fleet";
  db.query(sql, (err, data) => {
    if (err) {
      console.error("Error fetching fleet:", err);
      return res.status(500).json({ error: "Error fetching fleet" });
    }
    return res.status(200).json(data);
  });
});

// Insert a new vehicle
app.post("/admin/fleet/add", (req, res) => {
  const { name, vehicleType, numberPlate } = req.body;

  const sql =
    "INSERT INTO fleet (name, vehicleType, numberPlate) VALUES (?, ?, ?)";
  const values = [name, vehicleType, numberPlate];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error inserting vehicle:", err); // Improved logging
      return res
        .status(500)
        .json({ error: "Error inserting vehicle", details: err.message }); // Improved error response
    }
    return res
      .status(201)
      .json({ message: "vehicle added successfully", data: result });
  });
});

// Route to get vehicle details by ID
app.get("/admin/fleet/:id", (req, res) => {
  const id = req.params.id;
  db.query("SELECT * FROM fleet WHERE ID = ?", [id], (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.send(result[0]);
  });
});

// Route to update vehicle details
app.put("/admin/fleet/:id", (req, res) => {
  const id = req.params.id;
  const { name, vehicleType, numberPlate } = req.body;
  db.query(
    "UPDATE fleet SET name = ?, vehicleType = ?, numberPlate = ? WHERE ID = ?",
    [name, vehicleType, numberPlate, id],
    (err, result) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.send({ message: "Vehicle updated successfully" });
    }
  );
});

// Route to delete a vehicle
app.delete("/admin/fleet/remove/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM fleet WHERE ID = ?", [id], (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.send({ message: "Vehicle deleted successfully" });
  });
});

app.get("/admin/vehicletypes", (req, res) => {
  const sql = "SELECT DISTINCT vehicleType FROM fleet";
  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).send({ error: "Error fetching vehicle types" });
    }
    res.send(results);
  });
});

//fetch pricing data
app.get("/admin/pricing", (req, res) => {
  const sql = "SELECT * FROM pricing";
  db.query(sql, (err, data) => {
    if (err) {
      console.error("Error fetching pricing:", err);
      return res.status(500).json({ error: "Error fetching pricing" });
    }
    return res.status(200).json(data);
  });
});

// Endpoint to add pricing
app.post("/admin/pricing/add", (req, res) => {
  const { vehicleType, fee } = req.body;
  const sql = "INSERT INTO pricing (vehicleType, fee) VALUES (?, ?)";
  db.query(sql, [vehicleType, fee], (err, result) => {
    if (err) {
      return res.status(500).send({ error: "Error adding pricing" });
    }
    res.send({ success: "Pricing added successfully", result });
  });
});

// Fetch specific pricing details
app.get("/admin/pricing/:id", (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM pricing WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) throw err;
    if (result.length === 0) {
      return res.status(404).json({ error: "Pricing not found" });
    }
    res.json(result[0]);
  });
});

// Update pricing
app.put("/admin/pricing/:id", (req, res) => {
  const { id } = req.params;
  const { fee } = req.body;
  const sql = "UPDATE pricing SET fee = ? WHERE id = ?";
  db.query(sql, [fee, id], (err, result) => {
    if (err) throw err;
    res.json({ id, fee });
  });
});

// Delete pricing
app.delete("/admin/pricing/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM pricing WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) throw err;
    res.json({ message: "Pricing deleted successfully" });
  });
});
// Endpoint to fetch all sessions
app.get("/admin/session", (req, res) => {
  const sql = "SELECT * FROM driving_session";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching sessions:", err);
      return res.status(500).send({ error: "Error fetching sessions" });
    }
    res.send(results);
  });
});

// Endpoint to add session
app.post("/admin/session/add", (req, res) => {
  const {
    session_name,
    session_date,
    start_time,
    end_time,
    instructor_id,
    vehicleType,
  } = req.body;

  const sql =
    "INSERT INTO driving_session (session_name, session_date, start_time, end_time, instructor_id,  vehicleType) VALUES (?, ?,  ?, ?, ?, ?)";

  db.query(
    sql,
    [
      session_name,
      session_date,
      start_time,
      end_time,
      instructor_id,
      vehicleType,
    ],
    (err, result) => {
      if (err) {
        console.error("Error adding session:", err);
        return res.status(500).send({ error: "Error adding session" });
      }
      res.status(201).send({
        id: result.insertId,
        session_name,
        session_date,
        start_time,
        end_time,
        instructor_id,
        vehicleType,
      });
    }
  );
});

// Endpoint to add instructor availability
app.post("/instructor/availability", (req, res) => {
  const { instructor_id, day_of_week, start_time, end_time } = req.body;

  if (!instructor_id || !day_of_week || !start_time || !end_time) {
    return res.status(400).send({ error: "All fields are required" });
  }

  const sql =
    "INSERT INTO instructor_availability (instructor_id, day_of_week, start_time, end_time) VALUES (?, ?, ?, ?)";

  db.query(
    sql,
    [instructor_id, day_of_week, start_time, end_time],
    (err, result) => {
      if (err) {
        console.error("Error adding instructor availability:", err);
        return res
          .status(500)
          .send({ error: "Error adding instructor availability" });
      }
      res.status(201).send({
        id: result.insertId,
        instructor_id,
        day_of_week,
        start_time,
        end_time,
      });
    }
  );
});

// Endpoint to get vehicles for a specific instructor
app.get("/admin/instructor/:id/vehicles", (req, res) => {
  const instructorId = req.params.id;

  const query = "SELECT vehicles FROM instructor WHERE ID = ?";

  db.query(query, [instructorId], (err, results) => {
    if (err) {
      console.error("Error fetching instructor's vehicles:", err);
      res.status(500).send("Error fetching instructor's vehicles");
      return;
    }

    if (results.length > 0) {
      const vehicles = JSON.parse(results[0].vehicles);
      res.status(200).json(vehicles);
    } else {
      res.status(404).send("Instructor not found");
    }
  });
});

// Add this endpoint in your server code

// Endpoint to check instructor availability
app.get("/instructor/availabilityy", (req, res) => {
  const { instructor_id, session_date, start_time, end_time } = req.query;

  const query = `
    SELECT * FROM driving_session 
    WHERE instructor_id = ? 
      AND session_date = ? 
      AND (
        (start_time <= ? AND end_time > ?) OR 
        (start_time < ? AND end_time >= ?) OR 
        (start_time >= ? AND end_time <= ?)
      )
  `;

  db.query(
    query,
    [
      instructor_id,
      session_date,
      start_time,
      start_time,
      end_time,
      end_time,
      start_time,
      end_time,
    ],
    (err, results) => {
      if (err) {
        console.error("Error checking instructor availability:", err);
        res.status(500).send("Error checking instructor availability");
        return;
      }

      res.status(200).json(results.length === 0);
    }
  );
});

// // Endpoint to get instructor availability for a given date and time
// app.get("/instructor/availability", (req, res) => {
//   const { session_date, start_time, end_time } = req.query;

//   const dayOfWeek = new Date(session_date).toLocaleDateString("en-us", {
//     weekday: "long",
//   });

//   const sql =
//     "SELECT instructor_id FROM instructor_availability WHERE day_of_week = ? AND start_time <= ? AND end_time >= ?";

//   db.query(sql, [dayOfWeek, start_time, end_time], (err, result) => {
//     if (err) {
//       console.error("Error checking instructor availability:", err);
//       return res
//         .status(500)
//         .send({ error: "Error checking instructor availability" });
//     }
//     res.send(result);
//   });
// });

//for instructor day based availability

// // Endpoint to get instructor availability for a given date and time
// app.get("/instructor/availability", (req, res) => {
//   const { session_date, start_time, end_time } = req.query;

//   const sessionDate = moment
//     .tz(session_date, "Asia/Colombo")
//     .format("YYYY-MM-DD");
//   const dayOfWeek = moment(sessionDate).format("dddd");

//   const sql =
//     "SELECT instructor_id FROM instructor_availability WHERE day_of_week = ? AND start_time <= ? AND end_time >= ?";

//   db.query(sql, [dayOfWeek, start_time, end_time], (err, result) => {
//     if (err) {
//       console.error("Error checking instructor availability:", err);
//       return res
//         .status(500)
//         .send({ error: "Error checking instructor availability" });
//     }
//     res.send(result);
//   });
// });

// // Endpoint to book a session
// app.post("/student/book", (req, res) => {
//   const { session_id, student_id } = req.body;
//   const sql = "INSERT INTO booking (session_id, student_id) VALUES (?, ?)";
//   db.query(sql, [session_id, student_id], (err, result) => {
//     if (err) {
//       console.error("Error booking session:", err);
//       return res.status(500).send({ error: "Error booking session" });
//     }
//     res.status(201).send({ success: "Session booked successfully", result });
//   });
// });

// // Endpoint to fetch all sessions for an instructor
// app.get("/instructor/sessions", (req, res) => {
//   const instructorId = 2; // Replace with authenticated instructor ID
//   const sql = "SELECT * FROM driving_session WHERE instructor_id = ?";
//   db.query(sql, [instructorId], (err, results) => {
//     if (err) {
//       console.error("Error fetching sessions:", err);
//       return res.status(500).send({ error: "Error fetching sessions" });
//     }
//     res.send(results);
//   });
// });

// //new 3
// app.get("/student/sessions", verifyToken, (req, res) => {
//   const studentId = req.studentId; // Use student_id from the token

//   console.log(`Fetching sessions for student ID: ${studentId}`);

//   const studentSql = `SELECT * FROM reg_students WHERE studentId = ?`;

//   db.query(studentSql, [studentId], (err, studentResults) => {
//     if (err) {
//       console.error("Error fetching student:", err);
//       return res.status(500).send({ error: "Error fetching student" });
//     }

//     if (studentResults.length === 0) {
//       console.log("No registered student found.");
//       return res.status(404).send({ error: "No registered student found" });
//     }

//     const student = studentResults[0];
//     const vehicleType = student.vehicles.trim();
//     console.log(`Student vehicle type: ${vehicleType}`);

//     const sessionSql = `
//       SELECT ds.*
//       FROM driving_session ds
//       WHERE TRIM(ds.vehicleType) = ? AND ds.is_booked = FALSE;
//     `;

//     db.query(sessionSql, [vehicleType], (err, sessionResults) => {
//       if (err) {
//         console.error("Error fetching sessions:", err);
//         return res.status(500).send({ error: "Error fetching sessions" });
//       }

//       console.log("Fetched sessions:", sessionResults);

//       if (sessionResults.length === 0) {
//         console.log("No sessions found for the student's vehicle type.");
//       }

//       res.send(sessionResults);
//     });
//   });
// });

// //before
// app.get("/student/bookings", verifyToken, (req, res) => {
//   const studentId = req.studentId;

//   if (!studentId) {
//     return res.status(400).json({ error: "Invalid student ID" });
//   }

//   const sql = "SELECT * FROM booking WHERE student_id = ?";
//   db.query(sql, [studentId], (err, results) => {
//     if (err) {
//       console.error("Error fetching bookings:", err);
//       return res.status(500).json({ error: "Failed to fetch bookings" });
//     }
//     return res.status(200).json(results);
//   });
// });

// Endpoint to fetch vehicles for the logged-in student
app.get("/student/vehicles", verifyToken, (req, res) => {
  const studentId = req.studentId;

  const sql = `
    SELECT vehicles 
    FROM reg_students 
    WHERE studentId = ?
  `;

  db.query(sql, [studentId], (err, results) => {
    if (err) {
      console.error("Error fetching student vehicles:", err);
      return res.status(500).send({ error: "Error fetching student vehicles" });
    }

    if (results.length === 0) {
      console.log("No vehicles found for the student.");
      return res
        .status(404)
        .send({ error: "No vehicles found for the student" });
    }

    const vehicles = results.map((result) => result.vehicles);
    res.status(200).json(vehicles);
  });
});

// //new new
// app.get("/student/booked-sessions", verifyToken, (req, res) => {
//   const studentId = req.userId;

//   const sql = `
//     SELECT ds.*
//     FROM driving_session ds
//     JOIN booking b ON ds.id = b.session_id
//     WHERE b.student_id = ?;
//   `;

//   db.query(sql, [studentId], (err, results) => {
//     if (err) {
//       console.error("Error fetching booked sessions:", err);
//       return res.status(500).send({ error: "Error fetching booked sessions" });
//     }
//     res.send(results);
//   });
// })();

app.get("/instructor/sessions", verifyToken, (req, res) => {
  if (req.userRole !== "instructor" || !req.instructorId) {
    return res.status(403).send({ error: "Access denied" });
  }

  const instructorId = req.instructorId; // Use the instructor ID obtained from the token
  console.log(`Fetching sessions for instructor ID: ${instructorId}`); // Debugging log
  const sql = "SELECT * FROM driving_session WHERE instructor_id = ?";
  db.query(sql, [instructorId], (err, results) => {
    if (err) {
      console.error("Error fetching sessions:", err);
      return res.status(500).send({ error: "Error fetching sessions" });
    }
    console.log("Fetched sessions:", results); // Debugging log
    res.send(results);
  });
});

//before
// Get sessions for a specific student
app.get("/student/session/:id", (req, res) => {
  const studentId = req.params.id;
  const sql = `
    SELECT s.* FROM driving_session s
    JOIN booking b ON s.id = b.session_id
    WHERE b.student_id = ?
  `;
  db.query(sql, [studentId], (err, data) => {
    if (err) {
      console.error("Error fetching student sessions:", err);
      return res.status(500).json({ error: "Error fetching student sessions" });
    }
    return res.status(200).json(data);
  });
});

// Endpoint to get the total count of registered students
app.get("/admin/total-students", (req, res) => {
  const query = "SELECT COUNT(*) AS totalStudents FROM reg_students";
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.send({ totalStudents: results[0].totalStudents });
  });
});
// Endpoint to get the total count of registered students
app.get("/admin/fleet", (req, res) => {
  const query = "SELECT COUNT(*) AS totalVehicles FROM fleet";
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.send({ TotalVehicles: results[0].totalVehicles });
  });
});

// Endpoint to get the total count of instructors
app.get("/admin/total-instructors", (req, res) => {
  const query = "SELECT COUNT(*) AS totalInstructors FROM instructor";
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.send({ totalInstructors: results[0].totalInstructors });
  });
});

// Endpoint to get today's admissions count
app.get("/admin/today-admissions", (req, res) => {
  const query =
    "SELECT COUNT(*) AS todayAdmissions FROM reg_students WHERE DATE(registered_date) = CURDATE()"; // Adjust the table name and query as per your database
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.send({ todayAdmissions: results[0].todayAdmissions });
  });
});

// //before
// app.post("/student/book-session", verifyToken, (req, res) => {
//   const { session_id } = req.body;
//   const student_id = req.studentId;

//   if (!student_id) {
//     return res.status(400).json({ error: "Invalid student ID" });
//   }

//   const sql = "INSERT INTO booking (session_id, student_id) VALUES (?, ?)";
//   db.query(sql, [session_id, student_id], (err, result) => {
//     if (err) {
//       console.error("Error booking session:", err);
//       return res.status(500).json({ error: "Failed to book session" });
//     }
//     return res
//       .status(200)
//       .json({ id: result.insertId, session_id, student_id });
//   });
// });
// //before
// app.post("/student/cancel-booking", verifyToken, (req, res) => {
//   const { session_id } = req.body;
//   const student_id = req.studentId;

//   if (!student_id) {
//     return res.status(400).json({ error: "Invalid student ID" });
//   }

//   const sql = "DELETE FROM booking WHERE session_id = ? AND student_id = ?";
//   db.query(sql, [session_id, student_id], (err, result) => {
//     if (err) {
//       console.error("Error canceling booking:", err);
//       return res.status(500).json({ error: "Failed to cancel booking" });
//     }
//     return res.status(200).json({ message: "Booking canceled successfully" });
//   });
// });

app.get("/instructor/sessions", verifyToken, (req, res) => {
  if (req.userRole !== "instructor" || !req.instructorId) {
    return res.status(403).send({ error: "Access denied" });
  }

  const instructorId = req.instructorId; // Use the instructor ID obtained from the token
  console.log(`Fetching sessions for instructor ID: ${instructorId}`); // Debugging log
  const sql = "SELECT * FROM driving_session WHERE instructor_id = ?";
  db.query(sql, [instructorId], (err, results) => {
    if (err) {
      console.error("Error fetching sessions:", err);
      return res.status(500).send({ error: "Error fetching sessions" });
    }
    console.log("Fetched sessions:", results); // Debugging log
    res.send(results);
  });
});

// //before
// // Fetch sessions for students
// app.get("/student/sessions", (req, res) => {
//   const sql = "SELECT * FROM driving_session";
//   db.query(sql, (err, results) => {
//     if (err) {
//       console.error("Error fetching sessions:", err);
//       return res.status(500).send({ error: "Error fetching sessions" });
//     }
//     res.send(results);
//   });
// });

// //book sessions
// app.post("/student/book-session", verifyToken, (req, res) => {
//   const { session_id } = req.body;
//   const student_id = req.studentId;

//   if (!student_id) {
//     return res.status(400).json({ error: "Invalid student ID" });
//   }

//   // Check if the session is already booked
//   const checkSql = "SELECT * FROM booking WHERE session_id = ?";
//   db.query(checkSql, [session_id], (checkErr, checkResults) => {
//     if (checkErr) {
//       console.error("Error checking session booking:", checkErr);
//       return res.status(500).json({ error: "Failed to book session" });
//     }

//     if (checkResults.length > 0) {
//       return res
//         .status(400)
//         .json({ error: "Session already booked by another student" });
//     }

//     const sql = "INSERT INTO booking (session_id, student_id) VALUES (?, ?)";
//     db.query(sql, [session_id, student_id], (err, result) => {
//       if (err) {
//         console.error("Error booking session:", err);
//         return res.status(500).json({ error: "Failed to book session" });
//       }
//       return res
//         .status(200)
//         .json({ id: result.insertId, session_id, student_id });
//     });
//   });
// });

// app.get("/student/booked-sessions", verifyToken, (req, res) => {
//   const student_id = req.studentId;

//   if (!student_id) {
//     return res.status(400).json({ error: "Invalid student ID" });
//   }

//   const sql = `
//     SELECT s.*, b.id AS booking_id
//     FROM driving_session s
//     JOIN booking b ON s.id = b.session_id
//     WHERE b.student_id = ?
//   `;
//   db.query(sql, [student_id], (err, results) => {
//     if (err) {
//       console.error("Error fetching booked sessions:", err);
//       return res.status(500).json({ error: "Failed to fetch booked sessions" });
//     }
//     return res.status(200).json(results);
//   });
// });
// app.post("/student/cancel-booking", verifyToken, (req, res) => {
//   const { session_id } = req.body;
//   const student_id = req.studentId;

//   if (!student_id) {
//     return res.status(400).json({ error: "Invalid student ID" });
//   }

//   const sql = "DELETE FROM booking WHERE session_id = ? AND student_id = ?";
//   db.query(sql, [session_id, student_id], (err, result) => {
//     if (err) {
//       console.error("Error canceling booking:", err);
//       return res.status(500).json({ error: "Failed to cancel booking" });
//     }
//     return res.status(200).json({ message: "Booking canceled successfully" });
//   });
// });

// Endpoint to fetch all sessions
app.get("/student/sessions", verifyToken, (req, res) => {
  const sql = `
    SELECT s.*, 
      IF(b.student_id IS NULL, 0, 1) AS is_booked
    FROM driving_session s
    LEFT JOIN booking b ON s.id = b.session_id AND b.student_id = ?
  `;
  db.query(sql, [req.studentId], (err, results) => {
    if (err) {
      console.error("Error fetching sessions:", err);
      return res.status(500).json({ error: "Failed to fetch sessions" });
    }
    res.status(200).json(results);
  });
});

// Endpoint to fetch booked sessions
app.get("/student/booked-sessions", verifyToken, (req, res) => {
  const student_id = req.studentId;

  const sql = `
    SELECT s.*, b.id AS booking_id 
    FROM driving_session s
    JOIN booking b ON s.id = b.session_id
    WHERE b.student_id = ?
  `;
  db.query(sql, [student_id], (err, results) => {
    if (err) {
      console.error("Error fetching booked sessions:", err);
      return res.status(500).json({ error: "Failed to fetch booked sessions" });
    }
    res.status(200).json(results);
  });
});

// Endpoint to book a session
app.post("/student/book-session", verifyToken, (req, res) => {
  const { session_id } = req.body;
  const student_id = req.studentId;

  // Check if the session is already booked
  const checkSql = "SELECT * FROM booking WHERE session_id = ?";
  db.query(checkSql, [session_id], (checkErr, checkResults) => {
    if (checkErr) {
      console.error("Error checking session booking:", checkErr);
      return res.status(500).json({ error: "Failed to book session" });
    }

    if (checkResults.length > 0) {
      return res
        .status(400)
        .json({ error: "Session already booked by another student" });
    }

    const sql = "INSERT INTO booking (session_id, student_id) VALUES (?, ?)";
    db.query(sql, [session_id, student_id], (err, result) => {
      if (err) {
        console.error("Error booking session:", err);
        return res.status(500).json({ error: "Failed to book session" });
      }
      res.status(200).json({ id: result.insertId, session_id, student_id });
    });
  });
});

// Endpoint to cancel a booking
app.post("/student/cancel-booking", verifyToken, (req, res) => {
  const { session_id } = req.body;
  const student_id = req.studentId;

  const sql = "DELETE FROM booking WHERE session_id = ? AND student_id = ?";
  db.query(sql, [session_id, student_id], (err, result) => {
    if (err) {
      console.error("Error canceling booking:", err);
      return res.status(500).json({ error: "Failed to cancel booking" });
    }
    res.status(200).json({ message: "Booking canceled successfully" });
  });
});

// Route to handle file upload
app.post("/admin/learning-materials", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }
  const filePath = req.file.filename; // Store only the filename
  const description = req.body.description;

  const sql =
    "INSERT INTO learning_material (filePath, description) VALUES (?, ?)";
  db.query(sql, [filePath, description], (err, result) => {
    if (err) {
      console.error("Error saving learning material:", err);
      return res
        .status(500)
        .json({ error: "Failed to save learning material" });
    }
    return res
      .status(200)
      .json({ message: "Learning material uploaded successfully" });
  });
});

// Route to handle file upload
app.post(
  "/instructor/learning-materials",
  upload.single("file"),
  (req, res) => {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }
    const filePath = req.file.filename; // Store only the filename
    const description = req.body.description;

    const sql =
      "INSERT INTO learning_material (filePath, description) VALUES (?, ?)";
    db.query(sql, [filePath, description], (err, result) => {
      if (err) {
        console.error("Error saving learning material:", err);
        return res
          .status(500)
          .json({ error: "Failed to save learning material" });
      }
      return res
        .status(200)
        .json({ message: "Learning material uploaded successfully" });
    });
  }
);

// Route to fetch learning materials
app.get("/student/learning-materials", (req, res) => {
  const sql = "SELECT * FROM learning_material";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching learning materials:", err);
      return res
        .status(500)
        .json({ error: "Failed to fetch learning materials" });
    }
    return res.status(200).json(results);
  });
});

// Fetch daily income report
app.get("/admin/income/daily", (req, res) => {
  const sql = `
    SELECT DATE(registered_date) as date, SUM(amountPaid) as totalIncome
    FROM reg_students
    GROUP BY DATE(registered_date)
    ORDER BY DATE(registered_date) DESC;`;
  db.query(sql, (err, data) => {
    if (err) {
      console.error("Error fetching daily income report:", err);
      return res
        .status(500)
        .json({ error: "Error fetching daily income report" });
    }
    return res.status(200).json(data);
  });
});

// Fetch monthly income report
app.get("/admin/income/monthly", (req, res) => {
  const sql = `
    SELECT DATE_FORMAT(registered_date, '%Y-%m') as month, SUM(amountPaid) as totalIncome
    FROM reg_students
    GROUP BY DATE_FORMAT(registered_date, '%Y-%m')
    ORDER BY DATE_FORMAT(registered_date, '%Y-%m') DESC;`;
  db.query(sql, (err, data) => {
    if (err) {
      console.error("Error fetching monthly income report:", err);
      return res
        .status(500)
        .json({ error: "Error fetching monthly income report" });
    }
    return res.status(200).json(data);
  });
});

// Fetch annual income report
app.get("/admin/income/annual", (req, res) => {
  const sql = `
    SELECT YEAR(registered_date) as year, SUM(amountPaid) as totalIncome
    FROM reg_students
    GROUP BY YEAR(registered_date)
    ORDER BY YEAR(registered_date) DESC;`;
  db.query(sql, (err, data) => {
    if (err) {
      console.error("Error fetching annual income report:", err);
      return res
        .status(500)
        .json({ error: "Error fetching annual income report" });
    }
    return res.status(200).json(data);
  });
});

// // Route to handle student canceling booking
// app.post("/student/cancel-booking", verifyToken, (req, res) => {
//   const { session_id } = req.body;
//   const student_id = req.userId;

//   const sqlDeleteBooking =
//     "DELETE FROM booking WHERE session_id = ? AND student_id = ?";
//   const sqlGetSession = "SELECT * FROM driving_session WHERE id = ?";
//   const sqlCreateNotification =
//     "INSERT INTO notifications (user_id, message) VALUES (?, ?)";

//   db.query(sqlDeleteBooking, [session_id, student_id], (err, result) => {
//     if (err) {
//       console.error("Error canceling booking:", err);
//       return res.status(500).json({ error: "Failed to cancel booking" });
//     }

//     db.query(sqlGetSession, [session_id], (err, sessionResult) => {
//       if (err) {
//         console.error("Error fetching session:", err);
//         return res.status(500).json({ error: "Failed to fetch session" });
//       }

//       const session = sessionResult[0];
//       const message = `Student has canceled the session: ${session.session_name}`;

//       // Notify the instructor and admin
//       db.query(
//         sqlCreateNotification,
//         [session.instructor_id, message],
//         (err, result) => {
//           if (err) {
//             console.error("Error creating notification for instructor:", err);
//           }
//         }
//       );

//       db.query(
//         sqlCreateNotification,
//         ["cdbd9e65-a", message],
//         (err, result) => {
//           // Assuming user_id cdbd9e65-a is admin
//           if (err) {
//             console.error("Error creating notification for admin:", err);
//           }
//         }
//       );

//       return res.status(200).json({ message: "Booking canceled successfully" });
//     });
//   });
// });

// // Route to handle instructor canceling session
// app.post("/instructor/cancel-session", verifyToken, (req, res) => {
//   const { session_id } = req.body;
//   const instructor_id = req.userId;

//   const sqlDeleteSession =
//     "DELETE FROM driving_session WHERE id = ? AND instructor_id = ?";
//   const sqlGetBookings = "SELECT * FROM booking WHERE session_id = ?";
//   const sqlCreateNotification =
//     "INSERT INTO notifications (user_id, message) VALUES (?, ?)";

//   db.query(sqlDeleteSession, [session_id, instructor_id], (err, result) => {
//     if (err) {
//       console.error("Error canceling session:", err);
//       return res.status(500).json({ error: "Failed to cancel session" });
//     }

//     db.query(sqlGetBookings, [session_id], (err, bookingsResult) => {
//       if (err) {
//         console.error("Error fetching bookings:", err);
//         return res.status(500).json({ error: "Failed to fetch bookings" });
//       }

//       const message = `Instructor has canceled the session: ${session.session_name}`;

//       // Notify students and admin
//       bookingsResult.forEach((booking) => {
//         db.query(
//           sqlCreateNotification,
//           [booking.student_id, message],
//           (err, result) => {
//             if (err) {
//               console.error("Error creating notification for student:", err);
//             }
//           }
//         );
//       });

//       db.query(
//         sqlCreateNotification,
//         [cdbd9e65 - a, message],
//         (err, result) => {
//           // Assuming user_id cdbd9e65-a is admin
//           if (err) {
//             console.error("Error creating notification for admin:", err);
//           }
//         }
//       );

//       return res.status(200).json({ message: "Session canceled successfully" });
//     });
//   });
// });

// // Route to get notifications for a user
// app.get("/notifications", verifyToken, (req, res) => {
//   const userId = req.userId;

//   const sql =
//     "SELECT * FROM notifications WHERE user_id = ? ORDER BY created_at DESC";
//   db.query(sql, [userId], (err, results) => {
//     if (err) {
//       console.error("Error fetching notifications:", err);
//       return res.status(500).json({ error: "Failed to fetch notifications" });
//     }
//     return res.status(200).json(results);
//   });
// });

// // Route to mark a notification as read
// app.post("/notifications/:id/read", verifyToken, (req, res) => {
//   const notificationId = req.params.id;
//   const userId = req.userId;

//   const sql =
//     "UPDATE notifications SET is_read = TRUE WHERE id = ? AND user_id = ?";
//   db.query(sql, [notificationId, userId], (err, result) => {
//     if (err) {
//       console.error("Error marking notification as read:", err);
//       return res
//         .status(500)
//         .json({ error: "Failed to mark notification as read" });
//     }
//     return res.status(200).json({ message: "Notification marked as read" });
//   });
// });

app.get("/instructor/session-students/:sessionId", verifyToken, (req, res) => {
  const sessionId = req.params.sessionId;

  const sqlGetStudents = `
    SELECT s.ID, s.firstName, s.email 
    FROM student AS s
    JOIN booking AS b ON s.ID = b.student_id
    WHERE b.session_id = ?
  `;

  db.query(sqlGetStudents, [sessionId], (err, result) => {
    if (err) {
      console.error("Error fetching students for session:", err);
      return res.status(500).json({ error: "Failed to fetch students" });
    }

    return res.status(200).json(result);
  });
});

// Get all bookings with additional details
app.get("/admin/booking", (req, res) => {
  const sql = `
    SELECT 
      b.id, 
      b.booking_date, 
      ds.session_name, 
      ds.session_date,
      ds.start_time,
      ds.end_time,
      s.firstName AS student_firstName, 
      s.lastName AS student_lastName,
      i.firstName AS instructor_firstName,
      i.lastName AS instructor_lastName
    FROM booking b
    JOIN driving_session ds ON b.session_id = ds.id
    JOIN reg_students rs ON b.student_id = rs.studentId
    JOIN student s ON rs.studentId = s.ID
    JOIN instructor i ON ds.instructor_id = i.ID
  `;
  db.query(sql, (err, data) => {
    if (err) {
      console.error("Error fetching bookings:", err);
      return res.status(500).json({ error: "Error fetching bookings" });
    }
    return res.status(200).json(data);
  });
});

// const sendNotification = (userId, message) => {
//   const sqlCheckUser = "SELECT id FROM login WHERE id = ?";
//   db.query(sqlCheckUser, [userId], (err, results) => {
//     if (err) {
//       console.error("Error checking user ID:", err);
//       return;
//     }
//     if (results.length === 0) {
//       console.error("User ID does not exist:", userId);
//       return;
//     }

//     const sqlInsertNotification =
//       "INSERT INTO notifications (user_id, message) VALUES (?, ?)";
//     db.query(sqlInsertNotification, [userId, message], (err, result) => {
//       if (err) {
//         console.error("Error creating notification:", err);
//       }
//     });
//   });
// };

// app.post("/student/cancel-booking", verifyToken, (req, res) => {
//   const { session_id } = req.body;
//   const student_id = req.userId;

//   if (!student_id) {
//     return res.status(400).json({ error: "Invalid student ID" });
//   }

//   const sqlDeleteBooking =
//     "DELETE FROM booking WHERE session_id = ? AND student_id = ?";
//   const sqlGetSession = "SELECT * FROM driving_session WHERE id = ?";
//   const sqlGetInstructor =
//     "SELECT instructor_id FROM driving_session WHERE id = ?";

//   // Begin transaction
//   db.beginTransaction((err) => {
//     if (err) {
//       console.error("Error beginning transaction:", err);
//       return res.status(500).json({ error: "Failed to cancel booking" });
//     }

//     // Step 1: Delete booking
//     db.query(sqlDeleteBooking, [session_id, student_id], (err, result) => {
//       if (err) {
//         db.rollback(() => {
//           console.error("Error canceling booking:", err);
//           return res.status(500).json({ error: "Failed to cancel booking" });
//         });
//       }

//       console.log("Booking cancellation result:", result);

//       // Step 2: Fetch session details
//       db.query(sqlGetSession, [session_id], (err, sessionResult) => {
//         if (err) {
//           db.rollback(() => {
//             console.error("Error fetching session:", err);
//             return res.status(500).json({ error: "Failed to fetch session" });
//           });
//         }

//         console.log("Session fetch result:", sessionResult);

//         if (sessionResult.length === 0) {
//           db.rollback(() => {
//             return res.status(404).json({ error: "Session not found" });
//           });
//         }

//         const session = sessionResult[0];
//         const message = `Student has canceled the session: ${session.session_name}`;

//         // Step 3: Send notification to admin
//         sendNotification("cdbd9e65-a", message); // Replace with actual admin ID

//         // Commit transaction
//         db.commit((err) => {
//           if (err) {
//             db.rollback(() => {
//               console.error("Error committing transaction:", err);
//               return res
//                 .status(500)
//                 .json({ error: "Failed to cancel booking" });
//             });
//           }

//           return res
//             .status(200)
//             .json({ message: "Booking canceled successfully" });
//         });
//       });
//     });
//   });
// });

// // Route to get user role (this is just an example, adjust according to your authentication logic)
// app.get('/user/role', (req, res) => {
//   // Replace this with actual logic to fetch user role from your authentication system
//   const userId = req.query.userId; // Assume userId is passed as a query parameter
//   pool.execute('SELECT role FROM  WHERE id = ?', [userId])
//     .then(([rows]) => {
//       if (rows.length > 0) {
//         res.json({ role: rows[0].role });
//       } else {
//         res.status(404).json({ message: 'User not found' });
//       }
//     })
//     .catch(err => {
//       console.error(err);
//       res.status(500).json({ message: 'Internal server error' });
//     });
// });

// // Route to fetch learning materials
// app.get('/student/learning-materials', (req, res) => {
//   pool.execute('SELECT * FROM learning_materials')
//     .then(([rows]) => {
//       res.json(rows);
//     })
//     .catch(err => {
//       console.error(err);
//       res.status(500).json({ message: 'Internal server error' });
//     });
// });

// // Route to delete a learning material
// app.delete('/admin/learning-materials/:id', (req, res) => {
//   const materialId = req.params.id;
//   pool.execute('DELETE FROM learning_materials WHERE id = ?', [materialId])
//     .then(([result]) => {
//       if (result.affectedRows > 0) {
//         res.json({ message: 'Learning material deleted successfully' });
//       } else {
//         res.status(404).json({ message: 'Learning material not found' });
//       }
//     })
//     .catch(err => {
//       console.error(err);
//       res.status(500).json({ message: 'Internal server error' });
//     });
// });

// // Endpoint to fetch driving sessions based on student's registered vehicles
// app.get("/student/sessions", (req, res) => {
//   const { studentId } = req.query;

//   // Fetch registered vehicles of the student
//   db.query(
//     "SELECT vehicles FROM reg_students WHERE studentId = ?",
//     [studentId],
//     (err, results) => {
//       if (err) {
//         console.error("Error fetching student's registered vehicles:", err);
//         res.status(500).json({ error: "Internal server error" });
//         return;
//       }

//       const registeredVehicles = results.map((result) => result.vehicles);

//       // Fetch driving sessions filtered by vehicle type
//       db.query(
//         "SELECT * FROM driving_session WHERE vehicleType IN (?)",
//         [registeredVehicles],
//         (err, sessions) => {
//           if (err) {
//             console.error("Error fetching driving sessions:", err);
//             res.status(500).json({ error: "Internal server error" });
//             return;
//           }
//           res.json(sessions);
//         }
//       );
//     }
//   );
// });

// Get student profile
app.get("/admin/registered-students", (req, res) => {
  const studentId = req.user.id; // Assuming you have authentication middleware to get student id
  const sql = `SELECT * FROM student WHERE id = ?`;
  db.query(sql, [studentId], (err, data) => {
    if (err) {
      console.error("Error fetching student profile:", err);
      return res.status(500).json({ error: "Error fetching student profile" });
    }
    if (data.length === 0) {
      return res.status(404).json({ error: "Student not found" });
    }
    return res.status(200).json(data[0]);
  });
});

// // Update student profile
// app.put("/admin/registered-students", (req, res) => {
//   const studentId = req.user.id; // Assuming you have authentication middleware to get student id
//   const {
//     firstName,
//     lastName,
//     email,
//     phoneNumber,
//     addressLine1,
//     addressLine2,
//     addressLine3,
//   } = req.body;
//   const sql = `
//     UPDATE student
//     SET firstName = ?, lastName = ?, email = ?, phoneNumber = ?, addressLine1 = ?, addressLine2 = ?, addressLine3 = ?
//     WHERE id = ?`;
//   db.query(
//     sql,
//     [
//       firstName,
//       lastName,
//       email,
//       phoneNumber,
//       addressLine1,
//       addressLine2,
//       addressLine3,
//       studentId,
//     ],
//     (err, result) => {
//       if (err) {
//         console.error("Error updating student profile:", err);
//         return res
//           .status(500)
//           .json({ error: "Error updating student profile" });
//       }
//       if (result.affectedRows === 0) {
//         return res.status(404).json({ error: "Student not found" });
//       }
//       return res.status(200).json({ message: "Profile updated successfully" });
//     }
//   );
// });

// Endpoint to fetch today's admissions
app.get("/admin/today-admissions", (req, res) => {
  const sql = `
    SELECT reg_students.*, student.firstName, student.lastName, student.dob, 
           student.addressLine1, student.addressLine2, student.addressLine3, 
           student.email, student.phoneNumber, student.nicNumber, student.gender 
    FROM reg_students 
    LEFT JOIN student ON reg_students.studentId = student.ID
    WHERE DATE(reg_students.registered_date) = CURDATE();`; // Fetch records where registered_date is today

  db.query(sql, (err, data) => {
    if (err) {
      console.error("Error fetching today's admissions:", err);
      return res
        .status(500)
        .json({ error: "Error fetching today's admissions" });
    }
    res.status(200).json({
      todayAdmissions: data.length, // Total count of today's admissions
      admissionsDetails: data, // Array of admissions details
    });
  });
});

app.listen(5000, () => {
  console.log("Running....");
});
