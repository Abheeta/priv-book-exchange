import Axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Cookie from "universal-cookie";
const cookies = new Cookie();

function Purchase(props) {
    const history = useHistory();
    const [ auth, changeAuth ] = useState(cookies.get("auth"));
    
    useEffect(() => {
        if(auth.user !== props.location.state.details.username & auth.type !== "user") history.push("/");
    }, [auth.type, auth.user, history]);

    const confirmPurchase = (e) => {
        e.preventDefault();
        Axios.put(`http://localhost:8000/api/buyrequests/${props.location.state.details.id}&Purchased`).then((res) => {
            alert("You have successfully purchased this book!")
            history.push("/");
        });
    }

    return (
        <div>
            <h3>Purchasing </h3>
            <img src={props.location.state.details.imgLink} alt="Book" /> <br/>
            <b>Title: </b>{props.location.state.details.title}<br/>
            <b>Price: </b>{props.location.state.details.price}<br/>
            <b>Description: </b>{props.location.state.details.description}<br/>
            <form onSubmit={(e) => confirmPurchase(e)}>
                <label><b>Payment Details: </b><input type="text" required="true" placeholder="Card Number"/></label><br/>
                <button type="submit">Confirm Purchase</button>
            </form>
        </div>
    )
}

export default Purchase
