import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import Cookie from "universal-cookie";
import "../stylesheets/NavOptions.css"
const cookies = new Cookie();

function NavOptions(props) {
    const location = useLocation();
    const history = useHistory();
    const [ auth, changeAuth ] = useState("");

    useEffect(() => {
        // console.log(location)
        changeAuth(cookies.get("auth"));
    }, [location])

    const logOut = (e) => {
        cookies.set("auth", {
            auth: false, 
            type: "none", 
            user: null
        }, { path: "/" });
        history.push("");
        changeAuth(cookies.get("auth"));
    }

    if(auth.auth && auth.type === "user")
        return (
            <div className="dropdown">
                <h4 className="dropbtn">My Profile</h4>
                <div className="dropdown-content">
                    <li onClick={(e) => {history.push(`/user/${auth.user}`)}}>My Account</li>
                    <li onClick={(e) => {history.push(`/user/${auth.user}/wishlist`)}}>My Wishlist</li>
                    <li onClick={(e) => {history.push(`/user/${auth.user}/sales`)}}>Sales</li>
                    <li onClick={(e) => {history.push(`/user/${auth.user}/requests`)}}>My Requests</li>
                    <li onClick={(e) => {logOut(e)}}>Log Out</li>
                </div>
            </div>
        );
    else if (auth.auth && auth.type !== "user")
        return (
            <div className="dropdown">
                <h4 className="dropbtn">My Profile</h4>
                <div className="dropdown-content">
                    <li onClick={(e) => {history.push(`/delivery-user/${auth.user}`)}}>My Account</li>
                    <li onClick={(e) => {history.push(`/delivery-user/${auth.user}/deliveries`)}}>Deliveries</li>
                    <li onClick={(e) => {logOut(e)}}>Log Out</li>
                </div>
            </div>
        )
    else
        return (
            <div className="dropdown">
                <div className="buttons" onClick={(e) => {history.push("/login")}} >Log In</div>
                <div className="buttons" onClick={(e) => {history.push("/register")}} >Sign Up</div>
            </div>
        )
}

export default NavOptions
