import React, { useState, useEffect } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import Axios from 'axios';
import Cookie from "universal-cookie";
const cookies = new Cookie();


function Login() {
    const history = useHistory();

    const [ loginType, changeLoginType ] = useState("User");

    const [ failedLogin, changeFail ] = useState({
        fail: false,
        message: ""
    });

    const LoginSchema = Yup.object().shape({
        username: Yup.string().required("Username is Required"),
        password: Yup.string().required("Password is Required")
    });

    useEffect(() => {
        console.log("logging in");
        if(cookies.get("auth").auth) {
            history.push("/");
        }
    }, []);

    const finishLogin = async (values) => {
        console.log(values);
        const url = loginType === "User" ? "user" : "delivery-user";
        await Axios.get(`http://localhost:8000/api/${url}s/${values.username}&${values.password}`).then((res) => {
            console.log(res);
            if(res.data.err) {
                changeFail({
                    fail: true,
                    message: res.data.message
                })
            }
            else {
                cookies.set("auth", {
                    auth: true, 
                    type: url,
                    user: values.username
                }, { path: "/" });
                history.push("/");
            }
        });
    }

    return (
        <div>
            <h1>Login as {loginType}</h1>
            { failedLogin.fail ? 
                <div style={{color: "red"}}>{ failedLogin.message }</div> :
                <div></div>
            }
            <Formik 
                initialValues = {{
                    username: '',
                    password: ''
                }}
                validationSchema = {LoginSchema}
                onSubmit = {(values) => finishLogin(values)}
            >
            {({errors, touched}) => (
                <Form>
                    <label>Username:<Field name="username" /></label>
                    {errors.username && touched.username ? (
                        <div>{errors.username}</div>
                    ) : <div></div>}
                    <label>Password:<Field name="password" type="password" /></label>
                    {errors.password && touched.password ? (
                        <div>{errors.password}</div>
                    ) : <div></div>}
                    <button type="submit">Login</button>
                </Form>
            )}
            </Formik>
            { loginType === "User" ? (
                <div><button onClick={(e) => {changeLoginType("Delivery User")}}>Login to deliver</button></div>
                ) : (
                <div><button onClick={(e) => {changeLoginType("User")}}>Login to exchange books</button></div>
                )}
        </div>
    )
}

export default Login
