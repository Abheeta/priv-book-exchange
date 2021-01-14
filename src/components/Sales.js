import Axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Cookie from "universal-cookie";
const cookies = new Cookie();

function Sales() {
    const history = useHistory();
    const params = useParams();
    const [ auth, changeAuth ] = useState(cookies.get("auth"));
    const [ sales, changeSales ] = useState([]);
    const [ accepted, changeAccepted ] = useState([]);

    useEffect(() => {
        if(auth.user !== params.username & auth.type !== "user") history.push("/");
        else {
            Axios.get(`http://localhost:8000/api/sells?username=${auth.user}`).then(async (result) => {
                await result.data.sells.forEach(async (value) => {
                    await Axios.get(`https://www.googleapis.com/books/v1/volumes/${value.book_id}`).then((result) => {
                        value.title = result.data.volumeInfo.title;
                        value.imgLink = result.data.volumeInfo.imageLinks.thumbnail;
                    });
                    await Axios.get(`http://localhost:8000/api/buyrequests/${value.id}`).then(async (result) => {
                        console.log(Array.isArray(result.data.buyRequests) && result.data.buyRequests.length > 0 )
                        value.buyRequests = result.data.buyRequests;
                        value.accepted = result.data.accepted;
                        changeAccepted({status: true, index: 0});
                    });
                });
                changeSales(result.data.sells);
            });
        }
    }, [auth.type, auth.user, history, params.username, accepted.status]);

    const acceptRequest = (e, res) => {
        Axios.put(`http://localhost:8000/api/buyrequests/${res.id}&Accepted`).then((result) => {
            alert("You have accepted this request.");
            changeAccepted({status: !accepted.status, index: 0});
        });
    }

    const declineRequest = (e, res) => {
        Axios.put(`http://localhost:8000/api/buyrequests/${res.id}&Declined`).then((result) => {
            alert("You have declined this request.");
            changeAccepted({status: !accepted.status, index: 0});
        });
    }

    const chooseDelivery = (e, res) => {
        history.push(`/user/${auth.user}/sales/${res.id}/deliver`, res);
    }

    return (
        <div>
            <h1 style={{display: "none"}}>{accepted.status ? (<div>yes</div>) : (<div>no</div>)}</h1>
            <h2>My Sales</h2>
            {sales.map((ans, index) => (
                <div key={ans.id} style={{borderBlockStyle: 'solid', borderLeft: "1px", margin: "10px 25% 10px 25%"}}>
                    <img src={ans.imgLink} alt="Book" onClick={(e) => {history.push(`/book/${ans.book_id}`)}}></img><br></br>
                    <b>Title:</b> {ans.title} <br></br>
                    <b>Price:</b> {ans.price} <br></br>
                    <b>Description:</b> {ans.description} <br></br>
                    <b>Requests:</b>
                    
                    { (ans.buyRequests) ? (<div>
                        {ans.buyRequests.map((res, index) => (
                            <div key={index}>
                                {ans.accepted ? res.status === "Accepted" ? (<div>
                                    {index+1}) {res.username} - Waiting for Payment
                                </div>) : res.status === "Purchased" ? (<div>
                                    {index+1}) {res.username} - Purchased<br/>
                                    <button onClick={(e) => chooseDelivery(e, res)}>Deliver</button>
                                </div>) : (<div>
                                    {index+1}) {res.username} - To Be Delivered
                                </div>)
                                : (<div>
                                    {index+1}) {res.username} - {res.status}: 
                                    <button onClick={(e) => acceptRequest(e, res)}>Accept</button>
                                    <button onClick={(e) => declineRequest(e, res)}>Decline</button>
                                </div>)}
                                
                            </div>
                        ))}
                    </div>) : (<div>
                        
                    </div>) }
                </div>
            ))}
        </div>
    )
}

export default Sales
