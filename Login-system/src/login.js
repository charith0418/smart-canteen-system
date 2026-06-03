import React, { useState } from 'react';
import './login.css';

function Login(){

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div style={{ display: 'flex' , height: '100vh' }}>

            <div style = {{ flex: 1 }}>
                <img src="canteen1.jpg" alt="Canteen1" style={{ width: '100%', height: '100%', objectFit: 'cover'}}/>
            </div>

            <div className="right-side">
                <div className="login-card">
                   <span style={{fontSize: '50px', marginTop: '40px' }}>🥗🍔</span>
                   <h1><b>Smart Canteen</b></h1>
                   <p>Sales Management System</p>
                   <br></br>
                   <h3><b>Login to your account</b></h3>

                   <div className="input-container">
                     <input
                        type=""
                        placeholder='👤 Username'
                        value={username}
                        onChange={(e)=> setUsername(e.target.value)}
                     />
                     <br></br>

                     <br></br>
                     <input
                        type=""
                        placeholder='🔑 Password'
                        value={password}
                        onChange={(e)=> setPassword(e.target.value)}
                     />

                   </div>

                   <div className="remember-container">
                     <input type="checkbox" id="rememberMe"/>
                     <label htmlFor="rememberMe">Remember me</label>

                      <a href="#forgot" className="forgot-link">Forgot Password?</a>

                   </div>

                   <button type="submit" className="login-btn">
                      Login
                   </button>

                   <div>
                    <p>
                        @ 2024 Smart Canteen Systems
                    </p>
                   </div>

                </div>
            </div>

        </div>
          
    );

}

export default Login;