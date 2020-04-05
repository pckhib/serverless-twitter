import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as middy from 'middy'
import { cors } from 'middy/middlewares'

import { UpdatePostRequest } from '../../requests/UpdatePostRequest'
import { getUserId } from '../../utils'
import { updatePost } from '../../businessLogic/posts'

import 'source-map-support/register'

export const handler = middy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  console.log('Processing event', event)

  const postId = event.pathParameters.postId
  const updatedPost: UpdatePostRequest = JSON.parse(event.body)
  const userId = getUserId(event)
  
  await updatePost(postId, userId, updatedPost)

  return {
    statusCode: 200,
    body: ''
  }
})

handler.use(
  cors({
    credentials: true
  })
)