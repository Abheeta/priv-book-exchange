import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Axios from 'axios';
import { useHistory } from 'react-router-dom';
import Cookie from "universal-cookie";
const cookies = new Cookie();


function Buy() {
    const params = useParams();
    const history = useHistory();
    const [ id, changeId ] = useState("");
    const [ book, changeBook ] = useState("");
    const [ availability, changeAvailability ] = useState(0);
    const [ sells, changeSells ] = useState([]);

    useEffect(() => {
        if(!cookies.get("auth").auth) {
            history.push("/login");
        }
        changeId(params);
        Axios.get(`http://localhost:8000/api/books/${params.book_id}`).then((result) => {
            changeAvailability(result.data.availability);
        });

        Axios.get(`https://www.googleapis.com/books/v1/volumes/${params.book_id}`).then((res) => {
            changeBook({
                ...book,
                id: res.data.id,
                title: res.data.volumeInfo.title,
                subtitle: res.data.volumeInfo.subtitle,
                publisher: res.data.volumeInfo.publisher,
                publishedDate: res.data.volumeInfo.publishedDate,
                language: res.data.volumeInfo.language,
                price: (res.data.saleInfo.listPrice) ? (res.data.saleInfo.listPrice.amount) : 0,
                authors: res.data.volumeInfo.authors,
                description: res.data.volumeInfo.description,
                categories: res.data.volumeInfo.categories,
                imgLink: res.data.volumeInfo.imageLinks.thumbnail
            });
        });

        Axios.get(`http://localhost:8000/api/sells/${params.book_id}`).then((res) => {
            // console.log(res);
            changeSells(res.data.sells);
        });
    }, []);

    const buyCopy = async (e, value) => {
        var confirmed = await window.confirm("Are you sure you want to buy this?");
        if (!confirmed) return;
        Axios.post(`http://localhost:8000/api/buyrequests`, {
            username: cookies.get("auth").user,
            sell_id: value.id
        }).then(async (result) => {
            await alert("A request has been sent to the user.")
        });
    }

    return (
        <div>
            <img alt="Book Cover" src={book.imgLink}></img> <br></br>
            <b>Title:</b> {book.title} <br></br>
            {(availability === 0) ? 
            (<div>This book is not on our bookshelf</div>) :
            (<div style={{alignContent: "center", alignItems: "center"}}>Available for sale
                {sells.map((value, index) => (<div key={value.id} style={{borderBlockStyle: 'solid', borderLeft: "1px", margin: "10px 25% 10px 25%"}}>
                    <b>Sold by:</b> {value.username} <br></br>
                    <b>Price:</b> {value.price} <br></br>
                    <b>Description:</b> {value.description} <br></br>
                    <button onClick={(e) => {buyCopy(e, value)}}>Buy this copy</button>
                </div>))}
            </div>)}
        </div>
    )
}

export default Buy
