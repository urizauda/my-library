import { BrowserRouter, Link, Route, Switch, Redirect } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import BooksList from './pages/BooksList'
import ReadingList from './pages/ReadingList'
import CompletedList from './pages/CompletedList'
import Details from './pages/Details'
import axios from 'axios'
import './App.css'
import {FaPowerOff} from "react-icons/fa"

function App() {
  const [auth, setAuth] = useState(null);
  const [books, setBooks] = useState([]);
  const [text, setText] = useState("")
  const [details, setDetails] = useState({})
  const [redirect, setRedirect] = useState(false)

  useEffect(() => {
    getData()
    let userDetail = localStorage.getItem("storage")
    userDetail ? setAuth(JSON.parse(userDetail)) : null;
  }, [])

  function setRating(id, rate) {
    const temp = [...books];
    const index = temp.findIndex((item) => {
      return item.id === id
    })
    temp[index].rating = rate;
    setBooks(temp)
  }

  function getData() {
    axios
      .get('./data.json')
      .then(function (response) {
        setBooks(response.data.books)
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  return (
    <BrowserRouter >
      <div className="App">
        {auth ?
          <>
            {<button className='logOut' title='Log out' onClick={() => { setAuth(null); localStorage.clear() }}><FaPowerOff /></button>}
            <Link to='/BooksList'>Books List</Link>
            <Link to='/ReadingList'>Reading List</Link>
            <Link to='/CompletedList'>Finished Books</Link>
          </> : <>
            <Redirect to='/' />
            <Link to='/Login'>Sign-In</Link>
            <Link to='/Register'>Sign-Up</Link>
          </>}
        <Switch>
          {auth ? "" : <Route exact path="/Login" render={() => <Login setAuth={setAuth} redirect={redirect} setRedirect={setRedirect} setText={setText} />} />}
          {auth ? "" : <Route exact path="/Register" render={() => <Register setAuth={setAuth} redirect={redirect} setRedirect={setRedirect} />} />}
          <Route exact path="/BooksList" render={() => <BooksList books={books} setBooks={setBooks} />} />
          <Route exact path="/ReadingList" render={() => <ReadingList books={books} setBooks={setBooks} setDetails={setDetails} />} />
          <Route exact path="/CompletedList" render={() => <CompletedList books={books} setBooks={setBooks} setDetails={setDetails} setRating={setRating} />} />
          <Route exact path="/Details" render={() => <Details books={books} setBooks={setBooks} text={text} setText={setText} details={details} setRating={setRating} />} />
        </Switch>
      </div>
    </BrowserRouter>
  )
}

export default App

