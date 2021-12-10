import LoginForm from "../components/LoginForm"

const Login = props => {

  return (
    <div>
      <h2>Login</h2>

      {!props.authenticated ? <LoginForm onAuthenticated={props.onAuthenticated} /> : ""}

    </div>
  )
}

export default Login