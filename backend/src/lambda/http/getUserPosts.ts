import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as middy from 'middy'
import { cors } from 'middy/middlewares'
import { getAllPostsByUser } from '../../businessLogic/posts'

import 'source-map-support/register'

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    console.log('Processing event', event)

    const userId = decodeURI(event.pathParameters.userId)
    const posts = await getAllPostsByUser(userId)

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
