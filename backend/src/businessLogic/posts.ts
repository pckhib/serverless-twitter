import * as uuid from 'uuid'

import { PostsAccess } from '../dataLayer/postsAccess'
import { PostItem } from '../models/PostItem'
import { CreatePostRequest } from '../requests/CreatePostRequest'
import { UpdatePostRequest } from '../requests/UpdatePostRequest'

import 'source-map-support/register'

const postsAccess = new PostsAccess()

export async function getAllPosts(): Promise<PostItem[]> {
  return postsAccess.getAllPosts()
}

export async function createPost(createPostRequest: CreatePostRequest, userId: string): Promise<PostItem> {
  const itemId = uuid.v4()

  return await postsAccess.createPost({
    userId: userId,
    postId: itemId,
    createdAt: new Date().toISOString(),
    title: createPostRequest.title,
    text: createPostRequest.text,
  })
}

export async function updatePost(postId: string, userId: string, updatePostRequest: UpdatePostRequest) {
  return await postsAccess.updatePost(postId, userId, {
    title: updatePostRequest.title,
    text: updatePostRequest.text,
  })
}

export async function deletePost(postId: string, userId: string) {
  return await postsAccess.deletePost(postId, userId)
}
