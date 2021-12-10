import RegisterForm from "../components/RegisterForm"

// const Register = props => {
const Register = () => {

  return (
    <div>
      <h2>Register</h2>

      {/* {!props.authenticated ? <RegisterForm onAuthenticated={props.onAuthenticated} /> : ""} */}
      <RegisterForm /> 

    </div>
  )
}

export default Register