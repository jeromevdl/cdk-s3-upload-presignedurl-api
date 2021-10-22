const AWS = require('aws-sdk')
const mime = require('mime-types')

AWS.config.update({ region: process.env.AWS_REGION })
const s3 = new AWS.S3()

exports.handler = async (event) => {
  // console.log(event);

  uploadURL = await getUploadURL(event);

  return {
    "statusCode": 200,
    "headers" : {
      "Content-Type": "application/json",
      "Access-Control-Allow-Headers" : "Authorization, *",
      "Access-Control-Allow-Origin": process.env.ALLOWED_ORIGIN,
      "Access-Control-Allow-Methods": "OPTIONS,GET"
    },
    "body": JSON.stringify(uploadURL)
  }
}

const getUploadURL = async function(event) {
  
  const apiRequestId = event.requestContext.requestId;
  const contentType = event.queryStringParameters.contentType;
  const extension = mime.extension(contentType);
  const s3Key = `${apiRequestId}.${extension}`;
  
  // Get signed URL from S3
  const s3Params = {
    Bucket: process.env.UPLOAD_BUCKET,
    Key: s3Key,
    Expires: parseInt(process.env.URL_EXPIRATION_SECONDS),
    ContentType: contentType
  }

  const signedUrl = await s3.getSignedUrlPromise('putObject', s3Params)

  return {
    uploadURL: signedUrl,
    key: s3Key
  }
}