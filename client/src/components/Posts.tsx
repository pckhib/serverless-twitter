import * as React from 'react'
import { History } from 'history'
import Auth from '../auth/Auth'
import { PostModel } from '../types/PostModel'
import { getPosts } from '../api/posts-api'
import { Header, Grid, Loader, Divider, Card, Button } from 'semantic-ui-react'
import { Post } from './Post'
import { Link } from 'react-router-dom'

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

  constructor(props: PostsProps) {
    super(props)

    this.refreshPosts = this.refreshPosts.bind(this)
  }

  componentDidMount() {
    this.refreshPosts()
  }

  async refreshPosts() {
    this.setState({
      loadingPosts: true,
    })

    try {
      const posts = await getPosts(this.props.auth.getIdToken())
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
        <Header as="h1" floated="left">
          Posts
        </Header>
        <Button primary floated="right" as={Link} to="/posts/create">
          Create Post
        </Button>
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
          Loading Posts
        </Loader>
      </Grid.Row>
    )
  }

  renderPostsList() {
    return (
      <div>
        <Card.Group>
          {this.state.posts.map((post) => {
            return (
              <Post
                key={post.postId}
                {...this.props}
                post={post}
                userId={this.props.auth.userInfo}
                refreshPosts={this.refreshPosts}
              />
            )
          })}
        </Card.Group>
      </div>
    )
  }
}
