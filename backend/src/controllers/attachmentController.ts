import * as AWS from 'aws-sdk'
import * as AWSXRay from 'aws-xray-sdk'

const XAWS = AWSXRay.captureAWS(AWS)

const attachmentsBucket = process.env.ATTACHMENTS_BUCKET

export const createUploadUrl = (todoId) => {
  const s3 = new XAWS.S3({
    signatureVersion: 'v4'
  })

  const uploadUrl = s3.getSignedUrl('putObject', {
    Bucket: attachmentsBucket, 
    Key: todoId,
    Expires: 300
  })

  return uploadUrl
}
