import 'source-map-support/register'

import * as AWS  from 'aws-sdk'
import * as uuid from 'uuid'
import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'

import { getUserId } from '../utils'
import { CreateTodoRequest } from '../../requests/CreateTodoRequest'

const docClient = new AWS.DynamoDB.DocumentClient()

const todosTable = process.env.TODOS_TABLE

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  console.log('Processing event: ', event)

  const userId = getUserId(event)
  const todoId = uuid.v4()

  const todo: CreateTodoRequest = JSON.parse(event.body)

  const newTodo = {
    userId,
    todoId,
    createdAt: new Date().toISOString(),
    name: todo.name,
    dueDate: todo.dueDate,
    done: false,
  }

  const params = {
    TableName: todosTable,
    Item: newTodo
  }

  await docClient.put(params).promise()

  return {
    statusCode: 201,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    body: JSON.stringify({
      newTodo
    })
  }
}
