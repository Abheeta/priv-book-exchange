import Axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Cookie from "universal-cookie";
const cookies = new Cookie();

function Profile() {
    const history = useHistory();
    const params = useParams();
    const [ auth, changeAuth ] = useState(cookies.get("auth"));
    const [ user, changeUser ] = useState([]);

    useEffect(() => {
        if(auth.user !== params.username) history.push("/");
        else {
            const url_type = auth.type === "user" ? "users" : "delivery-users"
            Axios.get(`http://localhost:8000/api/${url_type}?username=${auth.user}`).then(async (result) => {
                changeUser(result.data);
            });
        }
    }, [auth.type, auth.user, history, params.username]);

    const updateUser = (e) => {
        history.push(`/${auth.type}/${auth.user}/update`);
    }

    return (
        <div>
            <h3>My Profile</h3><br/>
            <b>Name: </b>{user.name}<br/><br/>
            <b>Username: </b>{user.username}<br/><br/>
            <b>E-mail: </b>{user.email}<br/><br/>
            <b>City: </b>{user.city}<br/><br/>
            {auth.type === "user" ? (<div>
                <b>Address: </b>{user.address}<br/>
            </div>) : (<div>
                <b>Status: </b>{user.status === 1 ? "Currently Delivering" : "Not Delivering"}<br/>
            </div>)}<br/>
            {/* <button onClick={(e) => updateUser(e)}>Update Profile</button> */}
        </div>
    )
}

export default Profile
