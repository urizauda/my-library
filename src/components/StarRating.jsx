import React, { useState } from 'react'
import { FaStar } from 'react-icons/fa'
import '../App.css'
import * as styles from '../pages/css/booklist.module.css';

export default function StarRating({bookRating, id, initRate}) {
    const [rating, setRating] = useState(initRate);
    const [hover, setHover] = useState(null);
    return (
        <div className={styles.starRating}>
            {[...Array(5)].map((star, i) => {
                const ratingValue = i + 1;
                return (
                    <label key={i} className={styles.star}>
                        <input type='radio' value={ratingValue}
                            onClick={() => {setRating(ratingValue); bookRating(id, ratingValue) }} />
                        <FaStar className='star' color={ratingValue <= (hover || rating) ? "yellow" : "gray"}
                            onMouseEnter={() => setHover(ratingValue)}
                            onMouseLeave={() => setHover(null)} />
                    </label>)
            })}
        </div>
    )
}
