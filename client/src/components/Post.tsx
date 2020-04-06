import * as React from 'react'
import { History } from 'history'
import { PostModel } from '../types/PostModel'
import { Card, Icon } from 'semantic-ui-react'

interface PostCardProps {
  post: PostModel
  userId: string
  history: History
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
        <Card.Content extra>
          <a>
            <Icon name="comment outline" />
            {/* TODO - add comments */}
            comments
          </a>
          {this.props.userId === this.props.post.userId && (
            <a style={{ marginLeft: '20px' }} onClick={() => this.onEditButtonClick(this.props.post)}>
              <Icon name="edit" />
              edit
            </a>
          )}
        </Card.Content>
      </Card>
    )
  }
}
