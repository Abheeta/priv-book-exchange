import Axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Cookie from "universal-cookie";
const cookies = new Cookie();

function Sales() {
    const history = useHistory();
    const params = useParams();
    const [ auth, changeAuth ] = useState(cookies.get("auth"));
    const [ sales, changeSales ] = useState("");

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
                        value.buyRequests = result.data.buyRequests;
                    })
                });
                changeSales(result.data.sells);
            });
        }
    }, []);

    return (
        <div>
            {/* <button onClick={(e) => {console.log(sales)}}>click</button> */}
            <h2>My Sales</h2>
            {sales.map((value, index) => (
                <div key={value.id} style={{borderBlockStyle: 'solid', borderLeft: "1px", margin: "10px 25% 10px 25%"}}>
                    <img src={value.imgLink} alt="Book" onClick={(e) => {history.push(`/book/${value.book_id}`)}}></img><br></br>
                    <b>Title:</b> {value.title} <br></br>
                    <b>Requests:</b>
                </div>
            ))}
        </div>
    )
}

export default Sales
