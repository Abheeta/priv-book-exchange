import Axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Cookie from "universal-cookie";
const cookies = new Cookie();

function Requests() {
    const history = useHistory();
    const params = useParams();
    const [ auth, changeAuth ] = useState(cookies.get("auth"));
    const [ requests, changeRequests ] = useState([]);
    const [ renderer, rerender ] = useState([]);

    useEffect(() => {
        if(auth.user !== params.username & auth.type !== "user") history.push("/");
        else {
            Axios.get(`http://localhost:8000/api/buyrequests?username=${auth.user}`).then(async (response) => {
                console.log(response);
                await response.data.buyRequests.forEach(async (value) => {
                    await Axios.get(`http://localhost:8000/api/sells?sell_id=${value.sell_id}`).then(async (res) => {
                        value.price = res.data.sells[0].price;
                        value.description = res.data.sells[0].description;
                        value.book_id = res.data.sells[0].book_id;
                    });
                    await Axios.get(`https://www.googleapis.com/books/v1/volumes/${value.book_id}`).then(async (res) => {
                        value.title = res.data.volumeInfo.title;
                        value.imgLink = res.data.volumeInfo.imageLinks.thumbnail;
                    });
                    rerender({status: true, index: 0});
                });
                changeRequests(response.data.buyRequests);
            });
            
        }
    }, [auth.type, auth.user, history, params.username]);

    const purchaseBook = (e, value) => {
        history.push(`/purchase/${value.id}`, {details: value});
    }

    return (
        <div>
            <h1 style={{display: "none"}}>{renderer.status ? (<div>yes</div>) : (<div>no</div>)}</h1>
            <h2>My Sales</h2>
            {requests.map((value, index) => (<div key={value.id} style={{borderBlockStyle: 'solid', borderLeft: "1px", margin: "10px 25% 10px 25%"}}>
                <img src={value.imgLink} alt="Book" onClick={(e) => {history.push(`/book/${value.book_id}`)}}/><br></br>
                <b>Title:</b> {value.title} <br></br>
                {/* <button onClick={(e)=>console.log(value.sale.price)}>Click</button> */}
                <b>Price:</b> {value.price} <br></br>
                <b>Description:</b> {value.description} <br></br>
                <b>Status:</b> {value.status} <br></br>
                {value.status === "Accepted" ? (<div>
                    <button onClick={(e) => purchaseBook(e, value)}>Purchase</button>
                </div>) : (<div>

                </div>)}
            </div>))}
        </div>
    )
}

export default Requests
