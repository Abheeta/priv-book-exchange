import Axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Cookie from "universal-cookie";
const cookies = new Cookie();


function Wishlist() {
    const history = useHistory();
    const params = useParams();
    const [ auth, changeAuth ] = useState(cookies.get("auth"));
    const [ wishlist, changeWishlist ] = useState([]);
    const [ bookList, changeBookList ] = useState([]);
    const [ accepted, changeAccepted ] = useState([]);

    useEffect(() => {
        if(auth.user !== params.username & auth.type !== "user") history.push("/");
        else {
            Axios.get(`http://localhost:8000/api/wishlists/${auth.user}`).then(async (result) => {
                await result.data.wishlist.forEach(async (value) => {
                    await Axios.get(`https://www.googleapis.com/books/v1/volumes/${value.book_id}`).then((result) => {
                        value.title = result.data.volumeInfo.title;
                        value.imgLink = result.data.volumeInfo.imageLinks.thumbnail;
                        changeAccepted({status: true, index: 0});
                    });
                });
                changeWishlist(result.data.wishlist);
            });
        }
    }, [auth.type, auth.user, history, params.username, accepted.status]);

    // useEffect(() => {
    //     console.log("rerender")
    // }, [wishlist])

    return (
        <div>
            <h1 style={{display: "none"}}>{accepted.status ? (<div>yes</div>) : (<div>no</div>)}</h1>
            <h2>My Wishlist</h2>
            {wishlist.map((value, index) => (
                <div key={value.id} style={{borderBlockStyle: 'solid', borderLeft: "1px", margin: "10px 25% 10px 25%"}}>
                    <img src={value.imgLink} alt="Book" onClick={(e) => {history.push(`/book/${value.book_id}`)}}></img><br></br>
                    <b>Title:</b> {value.title} <br></br>
                    <b>Availabilty:</b> {value.available == 1 ? "Yes" : "No"} <br></br>
                    <button onClick={(e) => {history.push(`/${auth.user}/buy/${value.book_id}`)}}>Buy</button>
                </div>
            ))}
        </div>
    )
}

export default Wishlist
