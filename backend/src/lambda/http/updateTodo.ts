import 'source-map-support/register'

import * as AWS from 'aws-sdk'
import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'

import { getUserId } from '../utils'
import { UpdateTodoRequest } from '../../requests/UpdateTodoRequest'

const docClient = new AWS.DynamoDB.DocumentClient()
const todosTable = process.env.TODOS_TABLE

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  console.log('Processing event: ', event)

  const userId = getUserId(event)
  const todoId = event.pathParameters.todoId
  const updatedTodo: UpdateTodoRequest = JSON.parse(event.body)

  const params = {
    TableName: todosTable,
    Key: {
      userId,
      todoId
    },
    ExpressionAttributeNames: {
      "#n": "name", 
      "#dd": "dueDate",
      "#d": "done"
     }, 
    ExpressionAttributeValues: {
      ":n": updatedTodo.name,
      ":dd": updatedTodo.dueDate,
      ":d": updatedTodo.done
    },
    UpdateExpression: "SET #n = :n, #dd= :dd, #d= :d",
    ReturnValues: "UPDATED_NEW"
  };

  await docClient.update(params).promise();

  return {
    statusCode: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    body: ''
  }
}
