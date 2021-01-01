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

    useEffect(() => {
        if(auth.user !== params.username & auth.type !== "user") history.push("/");
        else {
            Axios.get(`http://localhost:8000/api/wishlists/${auth.user}`).then(async (result) => {
                await result.data.wishlist.forEach(async (value) => {
                    await Axios.get(`https://www.googleapis.com/books/v1/volumes/${value.book_id}`).then((result) => {
                        value.title = result.data.volumeInfo.title;
                        value.imgLink = result.data.volumeInfo.imageLinks.thumbnail;
                    });
                });
                changeWishlist(result.data.wishlist);
            });
        }
    }, []);

    useEffect(() => {
        console.log("rerender")
    }, [wishlist])

    // useEffect(() => {
    //     // var list = [];

    //     // async wisfor(var i = 0; i < wishlist.length; i++) {
    //     //     await Axios.get(`https://www.googleapis.com/books/v1/volumes/${wishlist[i].book_id}`).then((result) => {
    //     //         list = list + {
    //     //             title: result.data.volumeInfo.title,
    //     //             imgLink: result.data.volumeInfo.imageLinks.thumbnail
    //     //         }
    //     //     });
    //     // }

    //     wishlist.forEach(async (value, index) => {
    //         await Axios.get(`https://www.googleapis.com/books/v1/volumes/${value.book_id}`).then((result) => {
    //             var list = [];
    //             // list = list.push({
    //             //     title: result.data.volumeInfo.title,
    //             //     imgLink: result.data.volumeInfo.imageLinks.thumbnail
    //             // })
    //             console.log(result)
    //             console.log(list);
    //             changeBookList(list)
    //         });
    //     });
    //     // console.log(list)
    //     // changeBookList(list);
    // }, [wishlist]);


    return (
        <div>
            <h2>My Wishlist</h2>
            {wishlist.map((value, index) => (
                <div key={value.id} style={{borderBlockStyle: 'solid', borderLeft: "1px", margin: "10px 25% 10px 25%"}}>
                    <img src={value.imgLink} alt="Book" onClick={(e) => {history.push(`/book/${value.book_id}`)}}></img><br></br>
                    {/* {value.imgLink} */}
                    {/* {value.book_id} */}
                    {/* <button onClick={(e) => {console.log(wishlist)}}>Click</button> */}
                    <b>Title:</b> {value.title} <br></br>
                    <b>Availabilty:</b> {value.available == 1 ? "Yes" : "No"} <br></br>
                    <button onClick={(e) => {history.push(`/${auth.user}/buy/${value.book_id}`)}}>Buy</button>
                </div>
            ))}
        </div>
    )
}

export default Wishlist
