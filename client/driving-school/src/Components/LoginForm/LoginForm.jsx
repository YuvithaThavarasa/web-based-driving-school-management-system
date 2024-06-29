// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";

// function LoginForm() {
//   const [values, setValues] = useState({
//     email: "",
//     password: "",
//   });
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Check if user is already authenticated
//     const token = localStorage.getItem("token");
//     if (token) {
//       // If user is authenticated, redirect to appropriate dashboard
//       const role = localStorage.getItem("role");
//       if (role === "admin") {
//         navigate("/admin/dashboard");
//       } else if (role === "student") {
//         navigate("/student/dashboard");
//       } else if (role === "instructor") {
//         navigate("/instructor/dashboard");
//       }
//     }
//   }, [navigate]);

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     axios
//       .post("http://localhost:5000/login", values)
//       .then((res) => {
//         if (res.data.status === "Success") {
//           localStorage.setItem("token", res.data.token);
//           localStorage.setItem("role", res.data.role);
//           if (res.data.role === "admin") {
//             navigate("/admin/dashboard");
//           } else if (res.data.role === "student") {
//             navigate("/student/dashboard");
//           } else if (res.data.role === "instructor") {
//             // Ensure the token includes instructor_id for instructors
//             localStorage.setItem("instructor_id", res.data.instructor_id);
//             navigate("/instructor/dashboard");
//           } else {
//             alert("Unknown role");
//           }
//         } else {
//           alert(res.data.Error);
//         }
//       })
//       .catch((err) => console.log(err));
//   };

//   return (
//     <div className="d-flex justify-content-center align-items-center bg-primary vh-100">
//       <div className="bg-white p-3 rounded w-25">
//         <h2>Log in</h2>
//         <form onSubmit={handleSubmit}>
//           <div className="mb-3">
//             <label htmlFor="email">
//               <strong>Email</strong>
//             </label>
//             <input
//               type="email"
//               placeholder="Enter Email"
//               name="email"
//               onChange={(e) => setValues({ ...values, email: e.target.value })}
//               className="form-control rounded-0"
//             />
//           </div>
//           <div className="mb-3">
//             <label htmlFor="password">
//               <strong>Password</strong>
//             </label>
//             <input
//               type="password"
//               placeholder="Enter Password"
//               name="password"
//               onChange={(e) =>
//                 setValues({ ...values, password: e.target.value })
//               }
//               className="form-control rounded-0"
//             />
//           </div>
//           <button type="submit" className="btn btn-success w-100 rounded-0">
//             Log in
//           </button>
//           <p>You are agree to our terms and policies</p>
//           <Link
//             to="/register"
//             className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none"
//           >
//             Create an account
//           </Link>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default LoginForm;

// /*const LoginForm = () => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch("/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ username, password }),
//       });
//       const data = await response.json();
//       console.log(data); // You can handle the response here
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   };

//   return (
//     <div>
//       <br></br>
//       <br></br>
//       <br></br>
//       {/* Login Form */

// /* <div className="wrapper">
//         <form onSubmit={handleSubmit}>
//           <h1> Login </h1>
//           <div className="input-box">
//             <input
//               type="text"
//               placeholder="Username"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               required
//             />
//             <FaUser className="icon" />
//           </div>
//           <div className="input-box">
//             <input
//               type="password"
//               placeholder="Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//             <FaLock className="icon" />
//           </div>
//           <div className="remember-forgot">
//             <label>
//               <input type="checkbox" /> Remember me
//             </label>
//             <a href="https://www.youtube.com/watch?v=kghwFYOJiNg&t=48s">
//               Forgot password?
//             </a>
//           </div>
//           <button type="submit">Login</button>
//           <div className="register-link">
//             <p>
//               Don't have an account? <a href="#">Register</a>
//             </p>
//           </div>
//         </form>
//       </div>
//       <br></br>
//       <br></br>
//       <br></br>
//     </div>
//   );
// };
// */

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

function LoginForm() {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const role = localStorage.getItem("role");
      if (role === "admin") {
        navigate("/admin/dashboard");
      } else if (role === "student") {
        navigate("/student/session");
      } else if (role === "instructor") {
        navigate("/instructor/session");
      }
    }
  }, [navigate]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      axios
        .post("http://localhost:5000/login", values)
        .then((res) => {
          if (res.data.status === "Success") {
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("role", res.data.role);
            if (res.data.role === "admin") {
              navigate("/admin/dashboard");
            } else if (res.data.role === "student") {
              navigate("/student/session");
            } else if (res.data.role === "instructor") {
              localStorage.setItem("instructor_id", res.data.instructor_id);
              navigate("/instructor/session");
            } else {
              alert("Unknown role");
            }
          } else {
            alert(res.data.Error);
          }
        })
        .catch((err) => console.log(err));
    }
  };

  const validateForm = () => {
    let errors = {};
    let formIsValid = true;

    if (!values.email) {
      formIsValid = false;
      errors.email = "Email is required";
    }

    // Basic email validation
    if (values.email && !/\S+@\S+\.\S+/.test(values.email)) {
      formIsValid = false;
      errors.email = "Please enter a valid email address";
    }

    if (!values.password) {
      formIsValid = false;
      errors.password = "Password is required";
    }

    setErrors(errors);
    return formIsValid;
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
      <div className="bg-white p-3 rounded w-25">
        <h2>Log in</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email">
              <strong>Email</strong>
            </label>
            <input
              type="email"
              placeholder="Enter Email"
              name="email"
              value={values.email}
              onChange={(e) => setValues({ ...values, email: e.target.value })}
              className={`form-control rounded-0 ${
                errors.email ? "is-invalid" : ""
              }`}
            />
            {errors.email && (
              <div className="invalid-feedback">{errors.email}</div>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="password">
              <strong>Password</strong>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              name="password"
              value={values.password}
              onChange={(e) =>
                setValues({ ...values, password: e.target.value })
              }
              className={`form-control rounded-0 ${
                errors.password ? "is-invalid" : ""
              }`}
            />
            {errors.password && (
              <div className="invalid-feedback">{errors.password}</div>
            )}
          </div>
          <button type="submit" className="btn btn-success w-100 rounded-0">
            Log in
          </button>

          <p>You agree to our terms and policies</p>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
