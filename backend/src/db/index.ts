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

export const getTodos = async (userId) => {
  const params = {
    ExpressionAttributeValues: {
     ":u": userId
    }, 
    KeyConditionExpression: "userId = :u", 
    TableName: todosTable
   };

  const result = await docClient.query(params).promise()

  const items = result.Items

  return items
}

export const updateTodo = async(userId, todoId, todo) => {
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
      ":n": todo.name,
      ":dd": todo.dueDate,
      ":d": todo.done
    },
    UpdateExpression: "SET #n = :n, #dd= :dd, #d= :d",
    ReturnValues: "UPDATED_NEW"
  };

  await docClient.update(params).promise();
}

export const deleteTodo = () => {

}