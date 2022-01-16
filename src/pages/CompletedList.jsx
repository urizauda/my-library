import React, { useState } from 'react'
import StarRating from '../components/StarRating'
import { Redirect } from 'react-router-dom';
import * as styles from './css/booklist.module.css';
import { FaMinus } from "react-icons/fa";

export default function CompletedList({ books, setBooks, setDetails, setRating }) {
    let temp = [...books]
    const [redirect, setRedirect] = useState(false)

    return (
        <div>
            {redirect ? <Redirect to='/Details' /> : ""}
            <h1>Finished Books</h1>
            {temp.map((book, i) => {
                if (book.isCompleted == true && book.isReading == true) {
                    return (<div key={i} >
                        <div className={styles.container}>
                        <StarRating bookRating={setRating} id={book.id} initRate={book.rating} />
                            <img title='Click For Details' src={book.img} className={styles.img} onClick={() => { book.details = true; setRedirect(true); setDetails(book) }} />
                            <div className={styles.content}>
                                <h2>{book.name}</h2>
                                <h3 title='Author'>{book.author}</h3>
                                <p title='Description'>{book.description.slice(0, 250)}...</p>
                            </div>
                        </div>
                        {book.comment ? <div>{book.comment.map((comment, i) => {
                            return <p className={styles.showComment} key={i}>{comment}</p>
                        })}</div> : ""}
                        <button title='Delete' className={styles.deleteBtn} onClick={() => { book.isCompleted = false; book.isReading == false; setBooks(temp) }}><FaMinus size='10px' /></button>
                    </div>)
                }
            })}
        </div>
    )
}
