import React, { useState } from "react";
import axios from "axios";
import { API_KEY } from "../logic/keys";
import { SpinnerCircular } from "spinners-react";
import { Redirect } from 'react-router-dom';

export default function Register({ setAuth, redirect, setRedirect }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState(false);
    const [errorFromServer, setErrorFromServer] = useState(false);
    const [loading, setLoading] = useState(false);

    const register = () => {
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`;
        setLoading(true)
        axios
            .post(url, {
                email: email,
                password: password,
                confirmPassword: confirmPassword
            })
            .then(function (response) {
                setAuth(response.data)
                setLoading(false)
                localStorage.setItem("storage", JSON.stringify(response.data))
                console.log(response);
            })
            .catch(function (error) {
                setErrorFromServer(error);
                setLoading(false)
                console.log(error);
            });
    };

    return (
        <div className="loginPlusRegister">
            {redirect ? <Redirect to='/BooksList' /> : ""}
            <h1>Sign Up</h1>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    if (password.length > 5 && password === confirmPassword) {
                        register();
                        setRedirect(true)
                    } else {
                        alert("please check your password")
                    }
                }}
            >
                <input type="email" placeholder="E-mail" onChange={(e) => setEmail(e.target.value)} />
                <br></br>
                <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                <br></br>
                <input type="password" placeholder="Confirm Password" onChange={(e) => setConfirmPassword(e.target.value)} />
                <br></br>
                <input type="submit" value="Register" 
                />
            </form>
            {loading ? <SpinnerCircular color="blue" /> : ""}
            <p style={{ color: "red" }}>
                {errorFromServer ? "Error From Server" : ""}
            </p>
        </div>
    );
}
