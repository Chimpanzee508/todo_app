import Link from "next/link"
import { addTodo, getTodos } from '@/actions/userActions'
import { TodoItem } from '@/components/TodoItem'

export default async function Home() {
  return (
    <>
        <h1>Todo App</h1>
        <CreateTodo />
        <TodoList />
    </>
  )
}

function CreateTodo() {
    return (
        <form action={addTodo}>
            <h1>Create Todo</h1>
            <label htmlFor="title">Title</label>
            <input type="text" name="title" />
            <label htmlFor="description">Description</label>
            <input type="text" name="description" />
            <button type="submit">Add Todo</button>
            <Link href="/signup">Create an Account</Link>
            <Link href="/login">log in</Link>
        </form>
    )
}

async function TodoList() {
    const todos = await getTodos()
       
    return (
        <ul>
        {todos.map((todo) => (
            <li key={todo.id}>
            <TodoItem id={todo.id} title={todo.title} description={todo.description} />
            </li>
        ))}
        </ul>
    )
}