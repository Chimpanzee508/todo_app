'use server'

import { revalidatePath } from "next/cache"
import client from '@/app/_lib/db'
import bcrypt from 'bcryptjs'
import { redirect } from "next/navigation"

export type Todo = {
    id: string
    title: string
    description: string
}

const todos: Todo[] = []

export async function addTodo(formData: FormData) {
    const title = formData.get('title')
    const description = formData.get('description')
    const safeTitle = typeof title === 'string' ? title.trim() : ''
    const safeDescription = typeof description === 'string' ? description.trim() : ''

    if (!safeTitle || !safeDescription) {
        return
    }

    todos.unshift({
        id: crypto.randomUUID(),
        title: safeTitle,
        description: safeDescription,
    })

    revalidatePath('/')
}

export async function getTodos() {
    return todos
}

export async function updateTodo(formData: FormData) {
    const todoId = formData.get('todoId')
    const title = formData.get('title')
    const description = formData.get('description')

    const safeTodoId = typeof todoId === 'string' ? todoId : ''
    const safeTitle = typeof title === 'string' ? title.trim() : ''
    const safeDescription = typeof description === 'string' ? description.trim() : ''

    if (!safeTodoId || !safeTitle || !safeDescription) {
        return
    }

    const todo = todos.find((item) => item.id === safeTodoId)

    if (todo) {
        todo.title = safeTitle
        todo.description = safeDescription
    }

    revalidatePath('/')
}

export async function deleteTodo(formData: FormData) {
    const todoId = formData.get('todoId')
    const safeTodoId = typeof todoId === 'string' ? todoId : ''

    if (!safeTodoId) {
        return
    }

    const index = todos.findIndex((item) => item.id === safeTodoId)

    if (index !== -1) {
        todos.splice(index, 1)
    }

    revalidatePath('/')
}

type State = {
    success: boolean;
    message: string;
};

export async function CreateUser(state: State,
    formData: FormData
): Promise<State> {
    console.log([...formData.entries()])
    const id = crypto.randomUUID()
    const username = formData.get('username')
    const password = formData.get('password')
    const confirm_password = formData.get('confirmPassword')

    if (
        typeof username !== 'string' ||
        typeof password !== 'string' ||
        typeof confirm_password !== 'string'
    ) {
        return {
            success: false,
            message: "Invalid form data"
        }
    }

    if (!username.trim()) {
        return {
            success: false,
            message: 'please create a username'
        }
    } else if(!password.trim()) {
        return {
            success: false,
            message: 'please create a password'
        }
    } else if(!confirm_password.trim()) {
        return {
            success: false,
            message: 'please confirm password'
        }
    }

    if (confirm_password !== password) {
        return {
            success: false,
            message: "Passwords do not match"
        };
    }

    const hashed_password = await bcrypt.hash(password, 10)

    const user = {
        id,
        username,
        hashed_password
    }    
    //save to database
    await client.connect()
    const db = client.db('todo_app')

    const existing_user = await db.collection('users').findOne({username})

    if (existing_user) {
        return {
            success: false,
            message: 'username already exists'
        }
    }

    await db.collection('users').insertOne(user)
    return {
        success: true,
        message: "Account created"
    };
}      

export async function LogInUser(state: State, formData: FormData): Promise<State> {
    await client.connect()
    const db = client.db('todo_app')
    
    const username = formData.get('username')
    const password = formData.get('password')

    if (
        typeof username !== 'string' ||
        typeof password !== 'string'
    ) {
        return {
            success: false,
            message: 'invalid data types'
        }
    }

    const existing_user = await db.collection('users').findOne({username})

    if(!existing_user){
        return {
            success: false,
            message: 'user does not exist'
        }
    } 

    const password_attempt = await bcrypt.compare(password, existing_user.hashed_password)
    if (!password_attempt) {
        return {
            success: false,
            message: 'incorrect password'
        }
    }
    redirect('/dashboard')
}