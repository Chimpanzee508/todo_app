'use client'

import Link from "next/link";
import styles from './home.module.css'
import '@/app/globals.css'
import { useActionState, useState } from "react";
import { LogInUser } from "@/actions/userActions";

const initialState = {
    success: false,
    message: ''
}

export default function LoginForm() {
    const [state, formAction] = useActionState(LogInUser, initialState)
    const [username, setUsername] = useState('')

    function handleUsernameChange(e: React.ChangeEvent<HTMLInputElement>) {
        setUsername(e.target.value)
    }
    return (
        <form action={formAction} className={styles.login_form}>
            <h1>Login</h1>
            <label htmlFor="username">Username</label>
            <input type='text'
                    name='username'
                    value={username}
                    onChange={handleUsernameChange}
                    required
                     />

            <label htmlFor='password'>Password</label>
            <input type='password'
                    name='password'
                    required
                     />

            <button type='submit'>login</button>
            <p>{state.message}</p>
            <Link href='/signup'>sign up</Link>
            <Link href='/'>changed your mind?</Link>
        </form>
    )
}