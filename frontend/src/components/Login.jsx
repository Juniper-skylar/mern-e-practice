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

return (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 px-4">

    <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-2xl p-8">

      {/* Title */}
      <h2 className="text-3xl font-bold text-white text-center mb-2">
        Welcome Back
      </h2>
      <p className="text-gray-300 text-center mb-6 text-sm">
        Login to continue
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Email */}
        <input
          type="email"
          name="email"
          placeholder="Email address"
          value={data.email}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-xl bg-white/10 text-white placeholder-gray-300 border border-white/20 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        {/* Password */}
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={data.password}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-xl bg-white/10 text-white placeholder-gray-300 border border-white/20 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        {/* Button */}
        <button
          type="submit"
          className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition duration-300 shadow-lg hover:shadow-indigo-500/30"
        >
          Login
        </button>

      </form>

      {/* Footer */}
      <p className="text-gray-300 text-sm text-center mt-6">
        Don’t have an account?{" "}
        <Link to="/signup" className="text-indigo-400 hover:underline">
          Signup
        </Link>
      </p>

    </div>
  </div>
);
}
export default Login;