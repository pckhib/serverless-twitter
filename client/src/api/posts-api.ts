import Axios from 'axios'
import { PostModel } from '../types/PostModel'
import { apiEndpoint } from '../config'

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
