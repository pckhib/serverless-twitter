import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as middy from 'middy'
import { cors } from 'middy/middlewares'
import { getUserId } from '../../utils'
import { deletePost } from '../../businessLogic/posts'

import 'source-map-support/register'

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    console.log('Processing event', event)

    const postId = event.pathParameters.postId
    const userId = getUserId(event)

    await deletePost(postId, userId)

    return {
      statusCode: 200,
      body: '',
    }
  }
)

handler.use(
  cors({
    credentials: true,
  })
)
