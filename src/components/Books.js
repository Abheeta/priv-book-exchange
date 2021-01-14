import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Axios from 'axios';
import { useHistory } from 'react-router-dom';
import Cookie from "universal-cookie";
const cookies = new Cookie();

function Books() {
    const params = useParams();
    const [ book, changeBook ] = useState("");
    const [ id, changeId ] = useState(params.id);
    const [ availability, changeAvailability ] = useState(0);
    const [ inWishlist, changeInWishlist ] = useState(false);
    const history = useHistory();    

    useEffect(() => {
        changeId(params.id);
        
    }, [params.id]);

    useEffect(() => {
        Axios.get(`http://localhost:8000/api/books/${params.id}`).then((result) => {
            changeAvailability(result.data.availability);
        });

        Axios.get(`http://localhost:8000/api/wishlists/${cookies.get("auth").user}&${params.id}`).then((result) => {
            changeInWishlist(result.data.exists);
        });
    }, []);

    useEffect(() => {
        Axios.get(`http://localhost:8000/api/books/${params.id}`).then(async (result) => {
            changeAvailability(result.data.availability);
        });

        Axios.get(`http://localhost:8000/api/wishlists/${cookies.get("auth").user}&${params.id}`).then((result) => {
            changeInWishlist(result.data.exists);
        });
        
        Axios.get(`https://www.googleapis.com/books/v1/volumes/${params.id}`).then((res) => {
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
    }, [id]);

    const goToSells = async (e) => {
        const auth = await cookies.get("auth");
        if(auth.auth & auth.type === "user") history.push(`/${auth.user}/sell/${book.id}`);
        else history.push("/login");
    }

    const goToBuy = async (e) => {
        const auth = await cookies.get("auth");
        if(auth.auth & auth.type === "user") history.push(`/${auth.user}/buy/${book.id}`);
        else history.push("/login");
    }

    const addToWishlist = async (e) => {
        const auth = await cookies.get("auth");
        if(auth.auth & auth.type === "user")
        await Axios.get(`http://localhost:8000/api/books/${params.id}`).then((result) => {
            if(!result.data.exists) {
                Axios.post(`http://localhost:8000/api/books`, {
                    ...book,
                    price: (book.price === undefined) ? 0 : book.price,
                    description: (book.description === undefined) ? "N/A" : book.description.substring(0, 512),
                    availability: 0
                })
            }
            Axios.post(`http://localhost:8000/api/wishlists`, {
                username: cookies.get("auth").user,
                book_id: id,
                available: (availability > 0) ? 1 : 0
            }).then(async (result) => {
                await alert("Book has been added to your wishlist!");
                changeInWishlist(true);
            });
        });
        else 
            history.push("/login");
    }

    const removeFromWishlist = (e) => {
        Axios.delete(`http://localhost:8000/api/wishlists/${cookies.get("auth").user}&${id}`).then(async (result) => {
            await alert("Book has been removed from your wishlist.");
            changeInWishlist(false);
        })
    }

    return (
        <div>
            <img src={book.imgLink} alt="Book Cover"></img> <br></br>
            <b>Title:</b> {book.title} {book.subtitle ? (<div>- {book.subtitle}</div>) : (<br></br>)}
            <b>Author:</b> {book.authors} <br></br>
            <b>Description:</b> <div dangerouslySetInnerHTML={{__html: book.description}}></div> <br></br>
            <b>Language:</b> {book.language} <br></br>
            <b>Publisher:</b> {book.publisher} <br></br>
            <b>Published Date:</b> {book.publishedDate} <br></br>
            <b>Genre:</b> {book.categories} <br></br>
            <b>Availability:</b> {availability} <br></br>
            <button onClick={(e) => {goToSells(e)}}>Sell</button>
            <button onClick={(e) => {goToBuy(e)}}>Buy</button>
            {(!inWishlist ? 
            (<button onClick={(e) => {addToWishlist(e)}}>Add to Wishlist</button>) :
            (<button onClick={(e) => {removeFromWishlist(e)}}>Remove from Wishlist</button>))}
            
            
        </div>
    )
}

export default Books
