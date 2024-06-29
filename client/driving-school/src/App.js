import React from "react";
import "./App.css";
import Home from "./Components/Home";
import Footer from "./Components/Layouts/Footer";
import Header from "./Components/Layouts/Header";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useLocation,
} from "react-router-dom";
import LoginForm from "./Components/LoginForm/LoginForm";
import About from "./Components/About";
import Contact from "./Components/Contact";
import Register from "./Components/Register";
import "bootstrap/dist/css/bootstrap.min.css";
import Student from "./Components/admin/Student";
import StudentRegistrationForm from "./Components/user/StudentRegistrationForm";
import CalenderView from "./Components/admin/CalenderView";
import InstructorReg from "./Components/admin/InstructorReg";
import Instructor from "./Components/admin/Instructor";
import InstructorUpdate from "./Components/admin/InstructorUpdate";
import StudentUpdate from "./Components/admin/StudentUpdate";
import Successfull from "./Components/user/Successfull";
import AcceptStudent from "./Components/admin/AcceptStudent";
import Fleet from "./Components/admin/Fleet";
import AddVehicle from "./Components/admin/AddVehicle";
import Pricing from "./Components/admin/Pricing";
import AddPricing from "./Components/admin/AddPricing";
import Dashboard from "./Components/admin/Dashboard";
import StuDashboard from "./Components/student/StuDashboard";
import AdminView from "./Components/admin/AdminView";
import StudentView from "./Components/student/StudentView";
import RegStudent from "./Components/admin/RegStudent";
import PricingUpdate from "./Components/admin/PricingUpdate";
import FleetUpdate from "./Components/admin/FleetUpdate";
import StudentDetails from "./Components/student/StudentDetails";
import InsDashboard from "./Components/instructor/InstructorDashboard";
import InstructorView from "./Components/instructor/InstructorView";
import ManageProfile from "./Components/student/ManageProfile";
import UploadLearningMaterial from "./Components/admin/UploadLearningMaterial";
import LearningMaterials from "./Components/student/LearningMaterials";
import InsUploadLearningMaterial from "./Components/instructor/InsUploadLearningMaterial";
import IncomeReports from "./Components/admin/IncomeReports";
import InstructorAvailabilityForm from "./Components/instructor/InstructorAvailabilityForm";
import Booking from "./Components/admin/Booking";
import InstructorDashboard from "./Components/instructor/InstructorDashboard";
import UpdateStudent from "./Components/student/UpdateStudent";

const PrivateRoute = ({ children, role }) => {
  const userRole = localStorage.getItem("role");
  const token = localStorage.getItem("token");

  if (!token || userRole !== role) {
    return <Navigate to="/login" />;
  }

  return children;
};

function App() {
  return (
    <Router>
      <div>
        <AppContent />
      </div>
    </Router>
  );
}

function AppContent() {
  const location = useLocation();

  // Determine whether to show header and footer based on the path
  const showHeaderAndFooter =
    !location.pathname.startsWith("/admin") &&
    !location.pathname.startsWith("/student") &&
    !location.pathname.startsWith("/instructor");

  return (
    <div>
      {showHeaderAndFooter && (
        <div className="App">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            {/* <Route path="/register" element={<Register />} /> */}
            <Route path="/successful" element={<Successfull />} />
            <Route
              path="/admin/register"
              element={
                <PrivateRoute role="admin">
                  <Register />
                </PrivateRoute>
              }
            />

            {/* <Route
              path="/admin/registered-students/:id"
              element={<StudentProfile />}
            /> */}

            <Route
              path="/student/dashboard"
              element={
                <PrivateRoute role="student">
                  <StuDashboard />
                </PrivateRoute>
              }
            />

            <Route
              path="/instructor/dashboard"
              element={
                <PrivateRoute role="instructor">
                  <InstructorDashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/student/:id"
              element={
                <PrivateRoute role="student">
                  <StudentDetails />
                </PrivateRoute>
              }
            />
            <Route
              path="/student/session"
              element={
                <PrivateRoute role="student">
                  <StudentView />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/student"
              element={
                <PrivateRoute role="admin">
                  <Student />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/registered-students"
              element={
                <PrivateRoute role="admin">
                  <RegStudent />
                </PrivateRoute>
              }
            />
            <Route
              path="/registrationform"
              element={<StudentRegistrationFormContainer />} // Update the route to use StudentRegistrationFormContainer
            />
            <Route
              path="/admin/dashboard"
              element={
                <PrivateRoute role="admin">
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/calender"
              element={
                <PrivateRoute role="admin">
                  <CalenderView />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/instructorreg"
              element={
                <PrivateRoute role="admin">
                  <InstructorReg />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/instructor"
              element={
                <PrivateRoute role="admin">
                  <Instructor />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/instructorupdate/:id"
              element={
                <PrivateRoute role="admin">
                  <InstructorUpdate />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/studentupdate/:id"
              element={
                <PrivateRoute role="admin">
                  <UpdateStudent />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/acceptstudent/:id"
              element={
                <PrivateRoute role="admin">
                  <AcceptStudent />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/fleet"
              element={
                <PrivateRoute role="admin">
                  <Fleet />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/fleet/add"
              element={
                <PrivateRoute role="admin">
                  <AddVehicle />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/fleet/:id"
              element={
                <PrivateRoute role="admin">
                  <FleetUpdate />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/pricing"
              element={
                <PrivateRoute role="admin">
                  <Pricing />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/pricing/add"
              element={
                <PrivateRoute role="admin">
                  <AddPricing />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/pricing/:id"
              element={
                <PrivateRoute role="admin">
                  <PricingUpdate />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/session/add"
              element={
                <PrivateRoute role="admin">
                  <AdminView />
                </PrivateRoute>
              }
            />
            <Route
              path="/instructor/dashboard"
              element={
                <PrivateRoute role="instructor">
                  <InsDashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/instructor/session"
              element={
                <PrivateRoute role="instructor">
                  <InstructorView />
                </PrivateRoute>
              }
            />
            <Route
              path="/student/profile/:id"
              element={
                <PrivateRoute role="instructor">
                  <ManageProfile />
                </PrivateRoute>
              }
            />

            <Route
              path="/admin/learning-materials"
              element={
                <PrivateRoute role="admin">
                  <UploadLearningMaterial />
                </PrivateRoute>
              }
            />

            <Route
              path="/student/learning-materials"
              element={
                <PrivateRoute role="student">
                  <LearningMaterials />
                </PrivateRoute>
              }
            />

            <Route
              path="/instructor/learning-materials"
              element={
                <PrivateRoute role="instructor">
                  <InsUploadLearningMaterial />
                </PrivateRoute>
              }
            />

            <Route
              path="/admin/income"
              element={
                <PrivateRoute role="admin">
                  <IncomeReports />
                </PrivateRoute>
              }
            />

            <Route
              path="/instructor/availability"
              element={
                <PrivateRoute role="instructor">
                  <InstructorAvailabilityForm />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/booking"
              element={
                <PrivateRoute role="admin">
                  <Booking />
                </PrivateRoute>
              }
            />
          </Routes>

          <Footer />
        </div>
      )}
      {!showHeaderAndFooter && (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          {/* <Route path="/register" element={<Register />} /> */}
          <Route path="/successful" element={<Successfull />} />

          <Route
            path="/admin/register"
            element={
              <PrivateRoute role="admin">
                <Register />
              </PrivateRoute>
            }
          />

          {/* <Route
            path="/admin/registered-students/:id"
            element={<StudentProfile />}
          /> */}
          <Route
            path="/student/dashboard"
            element={
              <PrivateRoute role="student">
                <StuDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/instructor/dashboard"
            element={
              <PrivateRoute role="instructor">
                <InstructorDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/student/session"
            element={
              <PrivateRoute role="student">
                <StudentView />
              </PrivateRoute>
            }
          />
          <Route
            path="/student/:id"
            element={
              <PrivateRoute role="student">
                <StudentDetails />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/student"
            element={
              <PrivateRoute role="admin">
                <Student />
              </PrivateRoute>
            }
          />

          <Route
            path="/admin/registered-students"
            element={
              <PrivateRoute role="admin">
                <RegStudent />
              </PrivateRoute>
            }
          />
          <Route
            path="/registrationform"
            element={<StudentRegistrationFormContainer />} // Update the route to use StudentRegistrationFormContainer
          />
          <Route
            path="/admin/dashboard"
            element={
              <PrivateRoute role="admin">
                <Dashboard />
              </PrivateRoute>
            }
          />

          <Route
            path="/admin/calender"
            element={
              <PrivateRoute role="admin">
                <CalenderView />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/instructorreg"
            element={
              <PrivateRoute role="admin">
                <InstructorReg />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/instructor"
            element={
              <PrivateRoute role="admin">
                <Instructor />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/instructorupdate/:id"
            element={
              <PrivateRoute role="admin">
                <InstructorUpdate />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/studentupdate/:id"
            element={
              <PrivateRoute role="admin">
                <UpdateStudent />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/acceptstudent/:id"
            element={
              <PrivateRoute role="admin">
                <AcceptStudent />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/fleet"
            element={
              <PrivateRoute role="admin">
                <Fleet />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/fleet/add"
            element={
              <PrivateRoute role="admin">
                <AddVehicle />
              </PrivateRoute>
            }
          />

          <Route
            path="/admin/fleet/:id"
            element={
              <PrivateRoute role="admin">
                <FleetUpdate />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/pricing"
            element={
              <PrivateRoute role="admin">
                <Pricing />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/pricing/add"
            element={
              <PrivateRoute role="admin">
                <AddPricing />
              </PrivateRoute>
            }
          />

          <Route
            path="/admin/pricing/:id"
            element={
              <PrivateRoute role="admin">
                <PricingUpdate />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/session/add"
            element={
              <PrivateRoute role="admin">
                <AdminView />
              </PrivateRoute>
            }
          />

          <Route
            path="/instructor/dashboard"
            element={
              <PrivateRoute role="instructor">
                <InsDashboard />
              </PrivateRoute>
            }
          />

          <Route
            path="/instructor/session"
            element={
              <PrivateRoute role="instructor">
                <InstructorView />
              </PrivateRoute>
            }
          />

          <Route
            path="/student/profile/:id"
            element={
              <PrivateRoute role="instructor">
                <ManageProfile />
              </PrivateRoute>
            }
          />

          <Route
            path="/admin/learning-materials"
            element={
              <PrivateRoute role="admin">
                <UploadLearningMaterial />
              </PrivateRoute>
            }
          />
          <Route
            path="/student/learning-materials"
            element={
              <PrivateRoute role="student">
                <LearningMaterials />
              </PrivateRoute>
            }
          />

          <Route
            path="/instructor/learning-materials"
            element={
              <PrivateRoute role="instructor">
                <InsUploadLearningMaterial />
              </PrivateRoute>
            }
          />

          <Route
            path="/admin/income"
            element={
              <PrivateRoute role="admin">
                <IncomeReports />
              </PrivateRoute>
            }
          />

          <Route
            path="/instructor/availability"
            element={
              <PrivateRoute role="instructor">
                <InstructorAvailabilityForm />
              </PrivateRoute>
            }
          />

          <Route
            path="/admin/booking"
            element={
              <PrivateRoute role="admin">
                <Booking />
              </PrivateRoute>
            }
          />
        </Routes>
      )}
    </div>
  );
}

// Create a container component to handle student registration form logic
function StudentRegistrationFormContainer() {
  const handleStudentRegistration = (formData) => {
    // You can send this data to your backend server
    console.log("Student Registration Data:", formData);
  };

  return (
    <div>
      <StudentRegistrationForm onSubmit={handleStudentRegistration} />
    </div>
  );
}

export default App;
