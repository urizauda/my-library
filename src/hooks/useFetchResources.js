import { useState, useEffect } from "react";
import axios from 'axios'

export function useFetchResources(resource,key) {
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [errorFromServer, setErrorFromServer] = useState(false);
const [auth, setAuth] = useState(null);

const getData = () => {
const url = `https://identitytoolkit.googleapis.com/v1/accounts:${resource}?key=${key}`
axios
      .post(url, {
        email: email,
        password: password,
      })
      .then(function (response) {
        setAuth(response.data);
        console.log(response);
      })
      .catch(function (error) {
        setErrorFromServer(error);
        console.log(error);
      });
  };
  useEffect(getData, []);
  return {errorFromServer, setPassword, setEmail};
}
