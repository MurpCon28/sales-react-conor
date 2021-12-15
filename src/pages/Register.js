import RegisterForm from "../components/RegisterForm"
import { Container } from '@mui/material'

const Register = props => {

  return (
    <Container maxWidth="sm">
      <div>

        {!props.authenticated ? <RegisterForm onAuthenticated={props.onAuthenticated} /> : ""}

      </div>
    </Container>
  )
}

export default Register