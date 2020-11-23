import React, { useState, useEffect } from 'react';
import { useAuth, AuthContext } from "../context/auth.js";

function Register() {
    const [ userData, setUser ] = useState({
        name: "",
        username: "",
        email: "",
        password: "",
        password_confirm: "",
        city: "",
        address: ""
    });
    
    return (
        <div>
            <form>
                <label>
                    Name:
                    <input type="text" value={userData.name} onChange={(e) => {setUser({ ... userData, name: e.value})}} />
                </label><br></br>
                <label>
                    Username:
                    <input type="text" value={userData.username} onChange={(e) => {setUser({ ... userData, username: e.value})}} />
                </label><br></br>
                <label>
                    E-mail:
                    <input type="email" value={userData.email} onChange={(e) => {setUser({ ... userData, email: e.value})}} />
                </label><br></br>
                <label>
                    Password:
                    <input type="text" value={userData.password} onChange={(e) => {setUser({ ... userData, password: e.value})}} />
                </label><br></br>
                <label>
                    Confirm Password:
                    <input type="text" value={userData.password_confirm} onChange={(e) => {setUser({ ... userData, password_confirm: e.value})}} />
                </label><br></br>
                <label>
                    City:
                    <input type="text" value={userData.email} onChange={(e) => {setUser({ ... userData, email: e.value})}} />
                </label><br></br>
                <label>
                    Address:
                    <textarea value={userData.email} onChange={(e) => {setUser({ ... userData, email: e.value})}} />
                </label><br></br>
            </form>
        </div>
    )
}

export default Register
