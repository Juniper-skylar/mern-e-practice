import Signup from "./components/Signup";
import Login from "./components/Login";
import AdminDashboard from "./components/AdminDashboard";
import UserDashboard from "./components/UserDashboard";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/user-dashboard" element={<UserDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;