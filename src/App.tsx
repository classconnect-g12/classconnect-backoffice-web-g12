import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Home from "./pages/home";
import UserManagement from "./pages/user-management";
import AdminRegister from "./pages/admin-register";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import { CourseManagement } from "./pages/course-management";
import MembersPage from "./pages/course/members/membersPage";
import { CourseLogs } from "./pages/course/courseLogs/courseLogs";


function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/admin-register"
            element={
              <ProtectedRoute>
                <AdminRegister />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user-management"
            element={
              <ProtectedRoute>
                <UserManagement />
              </ProtectedRoute>
            }
          />
          <Route
            path="/course-management"
            element={
              <ProtectedRoute>
                <CourseManagement />
              </ProtectedRoute>
            }
          />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
        </Routes>
        <Routes>
          <Route 
            path="/course/:courseId/members" 
            element={
              <ProtectedRoute>
                <MembersPage />
              </ProtectedRoute>
            }
            />
        </Routes>
        <Routes>
            <Route 
            path="/course/:courseId/logs" 
            element={
              <ProtectedRoute>
                <CourseLogs />
              </ProtectedRoute>
            } 
            />
        </Routes>
  

      </Router>
    </>
  );
}

export default App;
