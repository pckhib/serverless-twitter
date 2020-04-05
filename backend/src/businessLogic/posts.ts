import { PostsAccess } from '../dataLayer/postsAccess'
import { PostItem } from '../models/PostItem'

import 'source-map-support/register'

const postsAccess = new PostsAccess()

export async function getAllPosts(): Promise<PostItem[]> {
  return postsAccess.getAllPosts()
}