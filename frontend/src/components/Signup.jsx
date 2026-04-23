import { useState } from "react"
import {save} from '../api/api'
import { Link } from "react-router-dom";

function Signup() {

    const [data, setData] = useState({
        username:'',
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

            await save(data);

            console.log("user registered successfully");

            setData({
                username:'',
                email:'',
                password:''
            });

        } catch(error){
            console.error("error while saving new user", error);
        }
    }

return(
    <>
        <form onSubmit={handleSubmit}>
            <input
             type="text"
             name="username"
             placeholder="enter username"
             value={data.username}
             onChange={handleChange}
             />

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

            <button type="submit">Signup</button>
                <p>Already have An account? please </p>
                <Link to="/">Login</Link>
        </form>
    </>
);

}
export default Signup;