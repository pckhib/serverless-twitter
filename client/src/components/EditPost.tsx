import * as React from 'react'
import { History } from 'history'
import Auth from '../auth/Auth'
import { editPost } from '../api/posts-api'
import { Form, TextArea, Input, Divider, Header } from 'semantic-ui-react'
import { RouteComponentProps } from 'react-router-dom'

interface EditPostProps extends RouteComponentProps {
  auth: Auth
  history: History
  location: any
}

interface EditPostState {
  title: string
  text: string
  postId: string
  updatingPost: boolean
}

export class EditPost extends React.PureComponent<EditPostProps, EditPostState> {
  state: EditPostState = {
    title: this.props.location.state.post.title,
    text: this.props.location.state.post.text,
    postId: this.props.location.state.post.postId,
    updatingPost: false,
  }

  handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ title: event.target.value })
  }

  handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    this.setState({ text: event.target.value })
  }

  handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault()

    try {
      if (!this.state.title || !this.state.text) {
        alert('Title and text should be provided')
        return
      }

      this.setUpdateState(true)
      await editPost(this.props.auth.getIdToken(), {
        postId: this.state.postId,
        title: this.state.title,
        text: this.state.text,
      })

      this.setState({
        title: '',
        text: '',
      })

      console.log('Edited post')

      alert('Post was edited!')

      this.props.history.goBack()
    } catch (e) {
      alert('Could not edit: ' + e.message)
    } finally {
      this.setUpdateState(false)
    }
  }

  setUpdateState(updatingPost: boolean) {
    this.setState({
      updatingPost,
    })
  }

  render() {
    return (
      <div>
        <Header as="h1" floated="left">
          Edit Post
        </Header>
        <Divider clearing />
        {this.renderForm()}
      </div>
    )
  }

  renderForm() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Field
          control={Input}
          label="Title"
          placeholder="Title"
          value={this.state.title}
          onChange={this.handleTitleChange}
        />
        <Form.Field
          control={TextArea}
          label="Text"
          placeholder="Say something..."
          value={this.state.text}
          onChange={this.handleTextChange}
        ></Form.Field>
        <Form.Button loading={this.state.updatingPost} type="submit">
          Update
        </Form.Button>
      </Form>
    )
  }
}
