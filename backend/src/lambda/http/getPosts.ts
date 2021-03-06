import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as middy from 'middy'
import { cors } from 'middy/middlewares'
import { getAllPosts } from '../../businessLogic/posts'

import 'source-map-support/register'

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    console.log('Processing event', event)

    const posts = await getAllPosts()

    return {
      statusCode: 200,
      body: JSON.stringify({
        items: posts,
      }),
    }
  }
)

handler.use(
  cors({
    credentials: true,
  })
)
