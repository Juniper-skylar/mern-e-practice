import { useState } from "react"
import {save} from '../api/api'
import { Link } from "react-router-dom";

function Signup() {

    const [data, setData] = useState({
        username:'',
        email:'',
        password:'',
        role:''
    });

    const handleChange = (e) => {
        setData({ ...data,
            [e.target.name] : e.target.value
        });
    }

    const handleSubmit = async(e) => {

        e.preventDefault();

        try{

            await save(data);

            alert("user registered successfully");

            setData({
                username:'',
                email:'',
                password:'',
                role:''
            });

        } catch(error){
            alert("error while saving new user");
            console.error("error while saving new user", error);
        }
    }

return (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 px-4">
    
    <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-2xl p-8">
      
      {/* Title */}
      <h2 className="text-3xl font-bold text-white text-center mb-2">
        Create Account
      </h2>
      <p className="text-gray-300 text-center mb-6 text-sm">
        Sign up to get started
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Username */}
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={data.username}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-xl bg-white/10 text-white placeholder-gray-300 border border-white/20 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

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

        {/* Role */}
        <select
          name="role"
          value={data.role}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-xl bg-white/10 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">Select role</option>
          <option value="regularUser">Regular User</option>
          <option value="adminUser">Admin User</option>
        </select>

        {/* Button */}
        <button
          type="submit"
          className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition duration-300 shadow-lg hover:shadow-indigo-500/30"
        >
          Sign Up
        </button>

      </form>

      {/* Footer */}
      <p className="text-gray-300 text-sm text-center mt-6">
        Already have an account?{" "}
        <Link to="/" className="text-indigo-400 hover:underline">
          Login
        </Link>
      </p>

    </div>
  </div>
);

}
export default Signup;