import * as middy from 'middy'
import { cors } from 'middy/middlewares'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { getUserId } from '../../utils'
import { generateUploadUrl } from '../../businessLogic/posts'

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    console.log('Processing event', event)

    const postId = event.pathParameters.postId
    const userId = getUserId(event)

    const uploadUrl = await generateUploadUrl(postId, userId)

    return {
      statusCode: 200,
      body: JSON.stringify({
        uploadUrl,
      }),
    }
  }
)

handler.use(
  cors({
    credentials: true,
  })
)
