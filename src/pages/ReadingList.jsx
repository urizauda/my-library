import React, { useState } from 'react'
import { Redirect } from 'react-router-dom';
import * as styles from './css/booklist.module.css';
import { FaMinus, FaPlus,  } from "react-icons/fa";

export default function ReadingList({ books, setBooks, setDetails }) {
    let temp = [...books];
    const [redirect, setRedirect] = useState(false)

    return (
        <div>
            {redirect ? <Redirect to='/Details' /> : ""}
            <h1>Reading List</h1>
            {temp.map((book, i) => {
                if (book.isCompleted == false && book.isReading == true) {
                    console.log(book);
                    return (<div key={i} className={styles.container}>
                        <img title='Click For Details' src={book.img} className={styles.img} onClick={() => { book.details = true; setRedirect(true) ; setDetails(book) }} />
                        <div className={styles.content}>
                        <h2>{book.name}</h2>
                        <h3 title='Author'>{book.author}</h3>
                        <button title='Mark as Read' className={styles.addBtn} onClick={() => { book.isCompleted = true; book.isReading = true; setBooks(temp) }}><FaPlus size='10px' /></button>
                        <p title='Description'>{book.description.slice(0, 250)}...</p>
                        </div>
                        <button title='Delete' className={styles.deleteBtn} onClick={() => {book.isReading = false; book.isCompleted = false; setBooks(temp)}}><FaMinus size='10px' /></button>
                        {book.comment ? <div>{book.comment.map((comment, i) => {
                            return <p key={i}>{comment}</p>
                        })}</div> : ""}
                    </div>)
                }
            })}
        </div>
    )
}
