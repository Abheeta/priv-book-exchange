import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useAuth, AuthContext } from "../context/auth.js";
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import Axios from 'axios';
// Axios.defaults.headers.get['Access-Control-Allow-Origin'] = 'http://localhost:8000';

function Register() {
    const [ userData, setUser ] = useState({
        name: '',
        username: '',
        email: '',
        password: '',
        password_confirm: '',
        city: 'Bangalore',
        address: ''
    });

    const RegisterSchema = Yup.object().shape({
        name: Yup.string().required("Name is required"),
        username: Yup.string().required("Username is Required").matches(/^[a-zA-Z0-9_]*$/, "username can only contain these [a-zA-Z0-9_]")
            .test("usernameValid", "Username exists", (value) => {
                // if(value !== "Abheetha")
                //     return false;
                // return true;
                console.log(value)
                Axios.get(`http://localhost:8000/api/users/${value}`).then((res) => {
                    console.log(res);
                }).catch((reason) => {
                    console.log(reason);
                });
            }),
        email: Yup.string().email("Invalid Email").required("Email is Required"),
        password: Yup.string().required("Password is Required")
            .matches(/^[a-zA-Z0-9_]*$/, "password can only contain these [a-zA-Z0-9_]").min(8, "Password too short"),
        password_confirm: Yup.string().oneOf([Yup.ref('password')], "Passwords must match").required("Passwords must match"),
        city: Yup.string(),
        address: Yup.string().required("Address Required").min(10, "Address too short")
    });

    useEffect(() => {
        console.log("registering");
        if(AuthContext.auth) {
            return <Redirect to='/' />
        }
    }, []);

    const finishRegister = (values) => {
        console.log("submitting");

    }
    
    return (
        <div>
            <h1>Register</h1>
            <Formik 
                initialValues = {{
                    name: '',
                    username: '',
                    email: '',
                    password: '',
                    password_confirm: '',
                    city: 'Bangalore',
                    address: ''
                }}
                validationSchema = {RegisterSchema}
                onSubmit = {(values) => finishRegister(values)}
            >
            {({errors, touched}) => (
                <Form>
                    <label>Name:<Field name="name" /></label>
                    {errors.name && touched.name ? (
                        <div>{errors.name}</div>
                    ) : <br></br>}
                    <label>Username:<Field name="username" /></label>
                    {errors.username && touched.username ? (
                        <div>{errors.username}</div>
                    ) : <br></br>}
                    <label>E-mail:<Field name="email" /></label>
                    {errors.email && touched.email ? (
                        <div>{errors.email}</div>
                    ) : <br></br>}
                    <label>Password:<Field name="password" type="password" /></label>
                    {errors.password && touched.password ? (
                        <div>{errors.password}</div>
                    ) : <br></br>}
                    <label>Confirm Password:<Field name="password_confirm" type="password" /></label>
                    {errors.password_confirm && touched.password_confirm ? (
                        <div>{errors.password_confirm}</div>
                    ) : <br></br>}
                    <label>City:<Field as="select" name="city">
                        <option value="Bangalore">Bangalore</option>
                        <option value="New Delhi">New Delhi</option>
                        <option value="Mumbai">Mumbai</option>
                    </Field>
                    </label>
                    {errors.city && touched.city ? (
                        <div>{errors.city}</div>
                    ) : <br></br>}
                    <label>Address:<Field name="address" /></label>
                    {errors.address && touched.address ? (
                        <div>{errors.address}</div>
                    ) : <br></br>}
                    <button type="submit">Register</button>
                </Form>
            )}
            </Formik>
        </div>
    )
}

export default Register
