import Axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Cookie from "universal-cookie";
const cookies = new Cookie();

function DeliverSale(props) {
    const history = useHistory();
    const params = useParams();
    const [ auth, changeAuth ] = useState(cookies.get("auth"));
    const [ compatible, changeCompatibility ] = useState({status: false, city: null, address: null});
    const [ independentDelivery, changeIndependentDelivery ] = useState(false);

    useEffect(() => {
        if(auth.user !== params.username & auth.type !== "user") history.push("/");
        else {
            Axios.get(`http://localhost:8000/api/users?username=${auth.user}`).then((response) => {
                Axios.get(`http://localhost:8000/api/users?username=${props.location.state.username}`).then((response_buyer) => {
                    if(response.data.city === response_buyer.data.city) {
                        changeCompatibility({status: true, city: response_buyer.data.city, address: response_buyer.data.address});
                        // console.log("same city")
                        // console.log(response.data.city)
                        // console.log(response_buyer.data.city)
                    }
                });
            });
        }
    }, [auth.type, auth.user, history, params.username, params.sell_id]);

    const deliverIndependently = (e) => {
        const confirm = window.confirm("Are you sure you want to deliver independently?");
        if(confirm) {
            Axios.put(`http://localhost:8000/api/buyrequests/${props.location.state.id}&Delivering`).then((res) => {
                changeIndependentDelivery(true);
            });
        }
    }

    const deliverThroughSite = (e) => {
        const confirm = window.confirm("Are you sure you want to deliver using our service?");
        if(confirm) {
            Axios.put(`http://localhost:8000/api/buyrequests/${props.location.state.id}&Delivering`).then((res) => {
                Axios.post(`http://localhost:8000/api/delivery-status`, {
                    id: props.location.state.id,
                    city: compatible.city
                }).then((response) => {
                    if(response.data.err) {
                        alert("No Delivery Users in Your City. Please deliver by yourself");
                        changeIndependentDelivery(true);
                    }
                    else {
                        alert("A delivery user will be dispatched shortly");
                        history.push("/")
                    }
                });
            });
        }
    }

    return (
        <div>
            <button onClick={(e) => console.log(props)}>lmao</button>
            <h3>Deliver Your Book</h3>
            {independentDelivery ? (<div>
                <b>You will have to deliver the book to the following address.<br/>
                    Address: </b>{compatible.address} <br/>
                <b>City: </b>{compatible.city}
            </div>) : (<div>
                <b>Option 1: Deliver the book through your own means.</b><br/>
                <button onClick={(e) => deliverIndependently(e)}>Deliver Independently</button>
                {compatible ? (<div>
                    <b>Option 2: Use our integrated delivery service</b><br/>
                    <button onClick={(e) => deliverThroughSite(e)}>Use Delivery Service</button>
                </div>) : (<div>
                    <b>Delivery is not available for users in a different city</b>
                </div>)}
            </div>)}
            
        </div>
    )
}

export default DeliverSale
