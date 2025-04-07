import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Home from "./pages/home";
import UserManagement from "./pages/user-management";
import AdminRegister from "./pages/admin-register";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/admin-register" element={<AdminRegister />} />
          <Route path="/user-management" element={<UserManagement />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
