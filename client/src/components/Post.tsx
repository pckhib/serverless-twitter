import * as React from 'react'
import { PostModel } from '../types/PostModel'
import { Card, Icon } from 'semantic-ui-react'

interface PostCardProps {
  post: PostModel
  userId: string
}

interface PostCardState {}

export class Post extends React.PureComponent<PostCardProps, PostCardState> {
  render() {
    return (
      <Card fluid>
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
            <a style={{ marginLeft: '20px' }}>
              <Icon name="edit" />
              {/* TODO - add edit functionality */}
              edit
            </a>
          )}
        </Card.Content>
      </Card>
    )
  }
}
