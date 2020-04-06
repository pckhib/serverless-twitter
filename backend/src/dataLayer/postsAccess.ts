import * as AWS from 'aws-sdk'
import * as AWSXRay from 'aws-xray-sdk'

import { PostItem } from '../models/PostItem'
import { PostUpdate } from '../models/PostUpdate'
import { DocumentClient } from 'aws-sdk/clients/dynamodb'

import 'source-map-support/register'

const XAWS = AWSXRay.captureAWS(AWS)

export class PostsAccess {
  constructor(
    private readonly docClient: DocumentClient = new XAWS.DynamoDB.DocumentClient(),
    private readonly twitterTable = process.env.TWITTER_TABLE,
    private readonly postIndex = process.env.POST_DATE_INDEX
  ) {}

  async getAllPosts(): Promise<PostItem[]> {
    console.log('Get all posts')

    const result = await this.docClient
      .scan({
        TableName: this.twitterTable,
        IndexName: this.postIndex,
      })
      .promise()

    const items = result.Items
    return items as PostItem[]
  }

  async getAllPostsByUser(userId: string): Promise<PostItem[]> {
    console.log('Get all posts for user', userId)

    const result = await this.docClient
      .query({
        TableName: this.twitterTable,
        KeyConditionExpression: 'userId = :userId',
        ExpressionAttributeValues: {
          ':userId': userId,
        },
      })
      .promise()

    const items = result.Items
    return items as PostItem[]
  }

  async createPost(postItem: PostItem): Promise<PostItem> {
    await this.docClient
      .put({
        TableName: this.twitterTable,
        Item: postItem,
      })
      .promise()

    return postItem
  }

  async updatePost(postId: string, userId: string, postUpdate: PostUpdate): Promise<PostUpdate> {
    console.log('Update post', postId, userId, postUpdate)

    await this.docClient
      .update({
        TableName: this.twitterTable,
        Key: {
          userId: userId,
          postId: postId,
        },
        UpdateExpression: 'set #title = :title, #text = :text',
        ExpressionAttributeNames: {
          '#title': 'title',
          '#text': 'text',
        },
        ExpressionAttributeValues: {
          ':title': postUpdate.title,
          ':text': postUpdate.text,
        },
      })
      .promise()

    return postUpdate
  }

  async deletePost(postId: string, userId: string): Promise<void> {
    await this.docClient
      .delete({
        TableName: this.twitterTable,
        Key: {
          postId: postId,
          userId: userId,
        },
      })
      .promise()
  }
}
