import * as React from 'react'
import Auth from '../auth/Auth'
import { Button, Header } from 'semantic-ui-react'

interface LogInProps {
  auth: Auth
}

interface LogInState {}

export class LogIn extends React.PureComponent<LogInProps, LogInState> {
  onLogin = () => {
    this.props.auth.login()
  }

  render() {
    return (
      <div>
        <Header as="h1">Please Log In</Header>
        <Button onClick={this.onLogin} size="big" positive>
          Log In
        </Button>
      </div>
    )
  }
}
