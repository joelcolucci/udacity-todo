import * as uuid from 'uuid'

import * as db from '../db'
import { TodoItem } from '../models/TodoItem'
import { CreateTodoRequest } from '../requests/CreateTodoRequest'
import { parseUserId } from '../auth/utils'

export async function createTodo(
  createTodoRequest: CreateTodoRequest,
  jwtToken: string
): Promise<TodoItem> {
  const userId = parseUserId(jwtToken)
  const todoId = uuid.v4()

  const newTodo = {
    userId,
    todoId,
    createdAt: new Date().toISOString(),
    name: createTodoRequest.name,
    dueDate: createTodoRequest.dueDate,
    done: false,
  }

  await db.createTodo(newTodo)

  return newTodo
}

export const getTodos = async (jwtToken) => {
  const userId = parseUserId(jwtToken)

  const todos = await db.getTodos(userId)

  return todos
}

export async function updateTodo() {

}

export const deleteTodo = () => {
  
}