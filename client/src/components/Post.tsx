import * as React from 'react'
import { History } from 'history'
import { PostModel } from '../types/PostModel'
import { Card, Icon } from 'semantic-ui-react'
import { deletePost } from '../api/posts-api'
import Auth from '../auth/Auth'

interface PostCardProps {
  auth: Auth
  post: PostModel
  userId: string
  history: History
  refreshPosts: any
}

interface PostCardState {}

export class Post extends React.PureComponent<PostCardProps, PostCardState> {
  onEditButtonClick(post: PostModel) {
    this.props.history.push({
      pathname: `/posts/${post.postId}/edit`,
      state: {
        post: post,
      },
    })
  }

  async onDeleteButtonClick(post: PostModel) {
    await deletePost(this.props.auth.getIdToken(), post.postId)

    this.props.refreshPosts()
  }

  render() {
    let cardProps = {}
    if (this.props.userId === this.props.post.userId) {
      cardProps = { color: 'green' }
    }
    return (
      <Card fluid {...cardProps}>
        <Card.Content>
          <Card.Header>{this.props.post.title}</Card.Header>
          <Card.Meta>{this.props.post.createdAt}</Card.Meta>
          <Card.Description>{this.props.post.text}</Card.Description>
        </Card.Content>
        {this.props.userId === this.props.post.userId && (
          <Card.Content extra>
            <a onClick={() => this.onEditButtonClick(this.props.post)}>
              <Icon name="edit" />
              edit
            </a>

            <a style={{ marginLeft: '20px' }} onClick={() => this.onDeleteButtonClick(this.props.post)}>
              <Icon name="delete" />
              delete
            </a>
          </Card.Content>
        )}
      </Card>
    )
  }
}
