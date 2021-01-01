import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Axios from 'axios';
import { useHistory } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import Cookie from "universal-cookie";
const cookies = new Cookie();


function Sell() {
    const params = useParams();
    const history = useHistory();
    const [ id, changeId ] = useState("");
    const [ book, changeBook ] = useState("");

    const SellSchema = Yup.object().shape({
        price: Yup.string().matches(/^[0-9]*$/, "Price should be a number").required("Price is Required"),
        description: Yup.string().required("Description is Required")
    });

    useEffect(() => {
        if(!cookies.get("auth").auth) {
            history.push("/login");
        }
        changeId(params);
    }, []);

    useEffect(() => {
        changeId(params);
        Axios.get(`https://www.googleapis.com/books/v1/volumes/${id.book_id}`).then((res) => {
            changeBook({
                id: res.data.id,
                title: res.data.volumeInfo.title,
                subtitle: res.data.volumeInfo.subtitle,
                publisher: res.data.volumeInfo.publisher,
                publishedDate: res.data.volumeInfo.publishedDate,
                language: res.data.volumeInfo.language,
                price: res.data.saleInfo.listPrice,
                authors: res.data.volumeInfo.authors,
                description: res.data.volumeInfo.description,
                categories: res.data.volumeInfo.categories,
                imgLink: res.data.volumeInfo.imageLinks.thumbnail
            })
        });
    }, [id]);

    const finishSell = async (values) => {
        await Axios.get(`http://localhost:8000/api/books/${params.book_id}`).then((result) => {
            if(!result.data.exists) {
                Axios.post(`http://localhost:8000/api/books`, {
                    ...book,
                    price: book.price | 0,
                    description: (book.description === undefined) ? "N/A" : book.description.substring(0, 512),
                    availability: 0
                })
            }
            Axios.post(`http://localhost:8000/api/sells`, {
                username: id.username,
                book_id: id.book_id,
                price: values.price,
                description: values.description,
                status: 1
            }).then(async (result) => {
                await alert("Book has been added to our bookshelf!");
                history.push("/");
            });
        });
    }

    return (
        <div>
            <img src={book.imgLink}></img> <br></br>
            <b>Title:</b> {book.title} <br></br>
            <Formik 
                initialValues = {{
                    price: '',
                    description: ''
                }}
                validationSchema = {SellSchema}
                onSubmit = {(values) => finishSell(values)}
            >
            {({errors, touched}) => (
                <Form>
                    <label>Price:<Field name="price" /></label>
                    {errors.price && touched.price ? (
                        <div>{errors.price}</div>
                    ) : <div></div>}
                    <label>Description:<Field name="description" /></label>
                    {errors.description && touched.description ? (
                        <div>{errors.description}</div>
                    ) : <div></div>}
                    <button type="submit">Sell</button>
                </Form>
            )}
            </Formik>
        </div>
    )
}

export default Sell
