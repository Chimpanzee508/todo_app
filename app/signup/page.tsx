'use client'
import Link from "next/link";
import styles from './signup.module.css'
import '@/app/globals.css'
import { useState, useActionState } from "react";
import { CreateUser } from '@/actions/userActions'

const initialState = {
    success: false,
    message: ""
};

export default function SignUp() {
    const [username, setUsername] = useState('')
    const [state, formAction] = useActionState(
        CreateUser,
        initialState
    );
    

    function handleUsernameChange(e: React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault()
        setUsername(e.target.value)
    }

    return (
        <form action={formAction} className={styles.sign_up}>
            <h1>Sign Up</h1>
            <label htmlFor="username">Username</label>
            <input type='text' 
                    onChange={handleUsernameChange} 
                    value={username} 
                    name='username'
                    required
                    />

            <label htmlFor='password'>Password</label>
            <input type='password' 
                    name='password'
                    required
                    />

            <label htmlFor="confirm_password">Confirm Password</label>
            <input type='password'
                    name='confirmPassword'
                    required
                    />
            <button type='submit'>Sign Up</button>
            <Link href='/login'>log in</Link>
            <Link href='/'>Changed your mind?</Link>
            <p>{state.message}</p>
        </form>
    )
}