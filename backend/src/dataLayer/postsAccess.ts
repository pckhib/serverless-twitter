import * as AWS from 'aws-sdk'
import * as AWSXRay from 'aws-xray-sdk'

import { PostItem } from '../models/PostItem'
import { DocumentClient } from 'aws-sdk/clients/dynamodb'

import 'source-map-support/register'

const XAWS = AWSXRay.captureAWS(AWS)

export class PostsAccess {

  constructor(
    private readonly docClient: DocumentClient = new XAWS.DynamoDB.DocumentClient(),
    private readonly twitterTable = process.env.TWITTER_TABLE
  ) {}

  async getAllPosts(): Promise<PostItem[]> {
    console.log('Get all posts')

    const result = await this.docClient.scan({
      TableName: this.twitterTable
    }).promise()

    const items = result.Items
    return items as PostItem[]
  }
}