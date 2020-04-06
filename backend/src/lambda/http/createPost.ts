import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as middy from 'middy'
import { cors } from 'middy/middlewares'

import { CreatePostRequest } from '../../requests/CreatePostRequest'
import { getUserId } from '../../utils'
import { createPost } from '../../businessLogic/posts'

import 'source-map-support/register'

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    console.log('Processing event', event)

    const newPost: CreatePostRequest = JSON.parse(event.body)
    const userId = getUserId(event)
    const newItem = await createPost(newPost, userId)

    return {
      statusCode: 201,
      body: JSON.stringify({
        item: newItem,
      }),
    }
  }
)

handler.use(
  cors({
    credentials: true,
  })
)
