import 'source-map-support/register'

import * as AWS from 'aws-sdk'
import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'

const attachmentsBucket = process.env.ATTACHMENTS_BUCKET

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const todoId = event.pathParameters.todoId

  const s3 = new AWS.S3({
    signatureVersion: 'v4'
  })
  const uploadUrl = s3.getSignedUrl('putObject', {
    Bucket: attachmentsBucket, 
    Key: todoId,
    Expires: 300
  })
  
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    body: JSON.stringify({
      uploadUrl
    })
  }
}
