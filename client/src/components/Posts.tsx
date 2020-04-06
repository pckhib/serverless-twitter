import * as React from 'react'
import { History } from 'history'
import Auth from '../auth/Auth'
import { PostModel } from '../types/PostModel'
import { getPosts } from '../api/posts-api'
import { Header, Grid, Loader, Divider, Card } from 'semantic-ui-react'
import { Post } from './Post'

interface PostsProps {
  auth: Auth
  history: History
}

interface PostsState {
  posts: PostModel[]
  newPostName: string
  loadingPosts: boolean
}

export class Posts extends React.PureComponent<PostsProps, PostsState> {
  state: PostsState = {
    posts: [],
    newPostName: '',
    loadingPosts: true,
  }

  async componentDidMount() {
    try {
      const posts = await getPosts(this.props.auth.idToken)
      this.setState({
        posts,
        loadingPosts: false,
      })
    } catch (e) {
      alert(`Failed to fetch posts: ${e.message}`)
    }
  }

  render() {
    return (
      <div>
        <Header as="h1">Posts</Header>
        <Divider clearing />
        {this.renderPosts()}
      </div>
    )
  }

  renderPosts() {
    if (this.state.loadingPosts) {
      return this.renderLoading()
    }

    return this.renderPostsList()
  }

  renderLoading() {
    return (
      <Grid.Row>
        <Loader indeterminate active inline="centered">
          Loading POSTs
        </Loader>
      </Grid.Row>
    )
  }

  renderPostsList() {
    return (
      <div>
        <Card.Group>
          {this.state.posts.map((post) => {
            return <Post key={post.postId} post={post} userId={this.props.auth.userInfo} />
          })}
        </Card.Group>
      </div>
    )
  }
}
