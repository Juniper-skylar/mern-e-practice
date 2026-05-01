import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './index.css';
import Signup from "./components/Signup";
import Login from "./components/Login";
import AdminDashboard from "./components/AdminDashboard";
import UserDashboard from "./components/UserDashboard";
import CarRegistration from './components/CarRegistration';
import ServiceRegistration from './components/ServiceRegistration';
import ServiceRecordRegistration from './components/ServiceRecordRegistration';
import ManageServiceRecord from './components/ManageServiceRecord';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/user-dashboard" element={<UserDashboard />} />
          <Route path="/save-car" element={<CarRegistration />} />
          <Route path="/save-service" element={<ServiceRegistration />} />
          <Route path="/save-service-record" element={<ServiceRecordRegistration />} />
          <Route path="/manage-service-record" element={<ManageServiceRecord />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;