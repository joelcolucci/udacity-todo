import * as AWS  from 'aws-sdk'

const docClient = new AWS.DynamoDB.DocumentClient()
const todosTable = process.env.TODOS_TABLE

export const createTodo = async (todo) => {
  const params = {
    TableName: todosTable,
    Item: todo
  }

  await docClient.put(params).promise()
}

export const updateTodo = () => {

}

export const getTodos = () => {

}

export const deleteTodo = () => {

}