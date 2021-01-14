import Axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Cookie from "universal-cookie";
const cookies = new Cookie();

function MyDeliveries() {
    const history = useHistory();
    const params = useParams();
    const [ auth, changeAuth ] = useState(cookies.get("auth"));
    const [ requests, changeRequests ] = useState([]);
    const [ accepted, changeAccepted ] = useState([]);

    useEffect(() => {
        if(auth.user !== params.username & auth.type !== "delivery-user") history.push("/");
        else {
            Axios.get(`http://localhost:8000/api/delivery-status/${auth.user}`).then(async (response) => {
                await response.data.forEach((value, index) => {
                    Axios.get(`http://localhost:8000/api/users?username=${value.seller_username}`).then((res) => {
                        // console.log(res);
                        value.seller_name = res.data.name;
                        value.seller_address = res.data.address;
                        value.seller_city = res.data.city;
                    });
                    Axios.get(`http://localhost:8000/api/users?username=${value.buyer_username}`).then((res) => {
                        // console.log(res);
                        value.buyer_name = res.data.name;
                        value.buyer_address = res.data.address;
                        value.buyer_city = res.data.city;
                        // changeRequests(response.data);
                        changeAccepted({status: true, index: 0});
                    });
                    
                });
                changeRequests(response.data);
                
            });
        }
    }, [auth.type, auth.user, history, params.username, accepted.status]);

    const changeDeliveryStatus = (e, value, msg) => {
        const ans = window.confirm("Are you sure?");
        if(ans) {
            Axios.put(`http://localhost:3000/api/delivery-status/${value.id}&${msg}&${value.buyrequest_id}`).then((response) => {
                if(msg === "Accepted") alert("You have accepted this request.");
                else if(msg === "Picked-Up") alert("You have picked up the book from the seller.");
                else alert("You have successfully delivered the book!.");
            });
            changeAccepted({status: !accepted.status, index: 0})
        }
    }

    return (
        <div>
            <h1 style={{display: "none"}}>{accepted.status ? (<div>yes</div>) : (<div>no</div>)}</h1>

            <h3>My Deliveries</h3>
            {requests.map((value, index) => (<div key={value.id} style={{borderBlockStyle: 'solid', borderLeft: "1px", margin: "10px 25% 10px 25%"}}>
                <h3>Pickup:</h3><br/>
                <b>Name: </b>{value.seller_name}<br/>
                <b>Address: </b>{value.seller_address}<br/>
                <b>City: </b>{value.seller_city}<br/>
                <h3>Drop:</h3><br/>
                <b>Name: </b>{value.buyer_name}<br/>
                <b>Address: </b>{value.buyer_address}<br/>
                <b>City: </b>{value.buyer_city}<br/>
                <h3>Drop:</h3><br/>
                <b>Status: </b>{value.status}<br/>
                {value.status === "Requested" ? (<div>
                    <button onClick={(e) => changeDeliveryStatus(e, value, "Accepted")}>Accept</button>
                </div>) : value.status === "Accepted" ? (<div>
                    <button onClick={(e) => changeDeliveryStatus(e, value, "Picked-Up")}>Confirm Pick Up</button>
                </div>) : value.status === "Picked-Up" ? (<div>
                    <button onClick={(e) => changeDeliveryStatus(e, value, "Delivered")}>Finish Delivery</button>
                </div>) : (<div></div>)}
            </div>))}
        </div>
    )
}

export default MyDeliveries
