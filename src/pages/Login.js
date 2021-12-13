import LoginForm from "../components/LoginForm"
import { Container } from '@mui/material'

const Login = props => {

  return (
    <Container maxWidth="sm">
      <div>
        <h2>Login</h2>

        {!props.authenticated ? <LoginForm onAuthenticated={props.onAuthenticated} /> : ""}

      </div>
    </Container>
  )
}

export default Login