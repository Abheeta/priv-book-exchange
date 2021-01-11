import Axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Cookie from "universal-cookie";
import { string } from 'yup';
const cookies = new Cookie();

function Sales() {
    const history = useHistory();
    const params = useParams();
    const [ auth, changeAuth ] = useState(cookies.get("auth"));
    const [ sales, changeSales ] = useState([]);
    const [ accepted, changeAccepted ] = useState({status: false, index: null});

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
                        //if (value.buyRequests.status)
                        //console.log(value.buyRequests);
                        value.buyRequests.forEach((request, index) => {
                            if (request.status === 'Accepted'){
                                changeAccepted({
                                    status: true,
                                    index: index
                                });
                            }
                        })
                    });
                });
                await changeSales(result.data.sells);
            });
        }
    },[]);

    useEffect(() => {
        console.log(sales)
    }, [sales])

    const acceptRequest = (e, res) => {

    }

    return (
        <div>
            <button onClick={(e) => {console.log(sales)}}>click</button>
            <h2>My Sales</h2>
            {sales.map((ans, index) => (
                <div key={ans.id} style={{borderBlockStyle: 'solid', borderLeft: "1px", margin: "10px 25% 10px 25%"}}>
                    <img src={ans.imgLink} alt="Book" onClick={(e) => {history.push(`/book/${ans.book_id}`)}}></img><br></br>
                    <b>Title:</b> {ans.title} <br></br>
                    
                    { (ans.buyRequests) ? (<div>
                        {ans.buyRequests.map((res, index) => (
                            <div key={index}><b>Request:</b> {res.username} - {res.status} :<button onClick={(e) => acceptRequest(e, res)}>Accept</button></div>
                        ))}
                    </div>) : (<div>
                        
                    </div>) }
                </div>
            ))}
        </div>
    )
}

export default Sales
