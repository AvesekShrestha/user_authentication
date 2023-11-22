import React, { useState } from 'react'
import '../style/login.css';
import axios from 'axios'
import config from '../config';
import { useNavigate } from 'react-router-dom';


export default function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error , setError] = useState(false);
    const navigate = useNavigate()
    
    const handelOnClick = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${config.BASE_URL}/auth/login`, { email, password });
            localStorage.setItem("token" , response.data.token);
            navigate("/");

        }catch(err){
            setError(true);
            console.log(error)
        }
    }

    return (
        <>
            <form className="form-signin">

                <div className="form-label-group">
                    <input type="email" id="inputEmail" className="form-control" placeholder="Email address" required autoFocus onChange={(e) => setEmail(e.target.value)} value={email} />
                    <label htmlFor="inputEmail">Email address</label>
                </div>

                <div className="form-label-group">
                    <input type="password" id="inputPassword" className="form-control" placeholder="Password" required onChange={(e) => setPassword(e.target.value)} value={password} />
                    <label htmlFor="inputPassword">Password</label>
                </div>

                <div className="checkbox mb-3">
                    <label>
                        <input type="checkbox" value="remember-me" /> Remember me
                    </label>
                </div>
                <button className="btn btn-lg btn-primary btn-block" onClick={handelOnClick} >Login</button>
            </form>


        </>
    )
}
