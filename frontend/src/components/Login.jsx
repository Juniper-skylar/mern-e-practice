import { useState } from "react"
import {signin} from '../api/api'
import { Link, useNavigate } from "react-router-dom";

function Login() {

    const navigate = useNavigate();

    const [data, setData] = useState({
        email:'',
        password:''
    });

    const handleChange = (e) => {
        setData({ ...data,
            [e.target.name] : e.target.value
        });
    }

    const handleSubmit = async(e) => {

        e.preventDefault();

        try{

            const response = await signin(data);

            console.log("user logged in successfully");

            localStorage.setItem('token', response.token);
            localStorage.setItem('role', response.role);

            localStorage.setItem('userdata', JSON.stringify(response.data));

            if(response.data.role === 'adminUser'){
                navigate('/admin-dashboard');
            }

            else{
                navigate('/user-dashboard');
            }

            setData({
                email:'',
                password:''
            });

        } catch(error){
            console.log("error while logging in user", error);
        }
    }

return(
    <>
        <form onSubmit={handleSubmit}>
            
            <input
             type="email"
             name="email"
             placeholder="enter email"
             value={data.email}
             onChange={handleChange}
             />

             <input
             type="password"
             name="password"
             placeholder="enter password"
             value={data.password}
             onChange={handleChange}
             />

            <button type="submit">Login</button>
            <p>Dont have An account? please </p>
            <Link to="/signup">Signup</Link>

        </form>
    </>
);

}
export default Login;