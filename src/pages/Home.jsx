import React from 'react'
import LogIn from './Login'
import Register from './Register'

export default function Home({setAuth}) {
    return (
        <div>
           <Register setAuth={setAuth} />
           <LogIn setAuth={setAuth} />
        </div>
    )
}
