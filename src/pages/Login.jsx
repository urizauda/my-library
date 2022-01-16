import React, { useState } from "react";
import axios from "axios";
import { API_KEY } from "../logic/keys";
import { SpinnerCircular } from "spinners-react";
import { Redirect } from 'react-router-dom';

export default function LogIn({ setAuth, redirect, setRedirect, setText }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorFromServer, setErrorFromServer] = useState(false);
    const [loading, setLoading] = useState(false);


    const logIn = () => {
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`;
        setLoading(true)
        axios
            .post(url, {
                email: email,
                password: password,
            })
            .then(function (response) {
                setAuth(response.data)
                setLoading(false)
                localStorage.setItem("storage", JSON.stringify(response.data))
                console.log(response);
            })
            .catch(function (error) {
                setErrorFromServer(error);
                console.log(error);
                setLoading(false)
            });
    };

    function getDataFromLocalStorage() {
        let notes = localStorage.getItem("notes")
        setText(JSON.parse(notes))

    }

    return (
        <div className="loginPlusRegister">
            {redirect ? <Redirect to='/BooksList' /> : ""}

            <h1>Sign In</h1>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    logIn();
                    getDataFromLocalStorage()
                    setRedirect(true)
                }}>
                <input type="email" placeholder="E-mail" onChange={(e) => setEmail(e.target.value)} />
                <br></br>
                <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                <br></br>
                <input type="submit" value="Log In" />
            </form>
            {loading ? <SpinnerCircular color="blue" /> : ""}
            <p style={{ color: "red" }}>{errorFromServer ? "Error From Server" : ""}</p>
        </div>
    );
}
