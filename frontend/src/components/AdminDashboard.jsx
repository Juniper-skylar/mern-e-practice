import { Link } from 'react-router-dom';

function AdminDashboard() {
    return(
        <>
            <h1>Welcome to the Admin Dashboard</h1>

            <h3>Tasks To Do</h3>
            <Link to='/save-car'>Insert Car</Link> <br />
            <Link to='/save-service'>Insert Service</Link> <br />
            <Link to='/save-service-record'>Insert Service Record</Link> <br />
        </>
    )
}

export default AdminDashboard;