import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as middy from 'middy'
import { cors } from 'middy/middlewares'
// import { getUserId } from '../../utils'
import { getAllPosts } from '../../businessLogic/posts'

import 'source-map-support/register'

export const handler = middy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  console.log('Processing event', event)

  // const userId = getUserId(event)
  const posts = await getAllPosts()

  return {
    statusCode: 200,
    body: JSON.stringify({
      items: posts
    })
  }
})

handler.use(
  cors({
    credentials: true
  })
)