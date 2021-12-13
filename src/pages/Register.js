import RegisterForm from "../components/RegisterForm"
import { Container } from '@mui/material'

// const Register = props => {
const Register = () => {

  return (
    <Container maxWidth="sm">
      <div>
        <h2>Register</h2>

        {/* {!props.authenticated ? <RegisterForm onAuthenticated={props.onAuthenticated} /> : ""} */}
        <RegisterForm /> 

      </div>
    </Container>
  )
}

export default Register