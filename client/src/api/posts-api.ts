import Axios from 'axios'
import { PostModel } from '../types/PostModel'
import { apiEndpoint } from '../config'
import { CreatePostRequest } from '../types/CreatePostRequest'

export async function getPosts(idToken: string): Promise<PostModel[]> {
  console.log('Fetching posts')

  const response = await Axios.get(`${apiEndpoint}/posts`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${idToken}`,
    },
  })

  const sortedItems = response.data.items.sort(sortByDate)

  console.log('Posts: ', sortedItems)
  return sortedItems
}

export async function createPost(idToken: string, newPost: CreatePostRequest): Promise<PostModel> {
  console.log('Creating post')

  const response = await Axios.post(`${apiEndpoint}/posts`, JSON.stringify(newPost), {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${idToken}`,
    },
  })
  return response.data.item
}

function sortByDate(a: PostModel, b: PostModel) {
  const timeA = new Date(a.createdAt).getTime()
  const timeB = new Date(b.createdAt).getTime()

  if (timeA < timeB) {
    return 1
  }
  if (timeA > timeB) {
    return -1
  }
  return 0
}
