import Axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Cookie from "universal-cookie";
const cookies = new Cookie();

function UpdateProfile() {
    const history = useHistory();
    const params = useParams();
    const [ auth, changeAuth ] = useState(cookies.get("auth"));

    useEffect(() => {
        if(auth.user !== params.username) history.push("/");
        else {

            
        }
    }, [auth.type, auth.user, history, params.username]);
    return (
        <div>
            
        </div>
    )
}

export default UpdateProfile
