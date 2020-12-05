import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'

import { createTodo } from '../../controllers/todoController';
import { CreateTodoRequest } from '../../requests/CreateTodoRequest'
import { getJwtTokenFromEvent } from '../utils'

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  console.log('Processing event: ', event)

  const jwtToken = getJwtTokenFromEvent(event)
  const createTodoRequest: CreateTodoRequest = JSON.parse(event.body)

  const todo = await createTodo(createTodoRequest, jwtToken)

  return {
    statusCode: 201,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    body: JSON.stringify({
      todo
    })
  }
}
