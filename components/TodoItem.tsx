'use client'

import { useState } from 'react'
import { deleteTodo, updateTodo } from '@/actions/userActions'

type TodoProps = {
  id: string
  title: string
  description: string
}

export function TodoItem({ id, title, description }: TodoProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [todoTitle, setTodoTitle] = useState(title)
  const [todoDescription, setTodoDescription] = useState(description)

  const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setTodoTitle(title)
    setTodoDescription(description)
    setIsEditing(false)
  }

  return (
    <form>
      <input type="hidden" name="todoId" value={id} />

      {isEditing ? (
        <>
          <input
            type="text"
            name="title"
            value={todoTitle}
            onChange={(event) => setTodoTitle(event.target.value)}
          />
          <input
            type="text"
            name="description"
            value={todoDescription}
            onChange={(event) => setTodoDescription(event.target.value)}
          />
          <button formAction={updateTodo} onClick={() => setIsEditing(false)}>
            save
          </button>
          <button onClick={handleCancel}>
            cancel
          </button>
        </>
      ) : (
        <>
          <h1>{todoTitle}</h1>
          <p>{todoDescription}</p>
          <button type="button" onClick={() => setIsEditing(true)}>
            edit
          </button>
          <button type="submit" formAction={deleteTodo}>
            delete
          </button>
        </>
      )}
    </form>
  )
}
