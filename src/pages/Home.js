import LoginForm from "../components/LoginForm"

const Home = props => {

  return (
    <div>
      <h2>Home</h2>

      {!props.authenticated ? <LoginForm onAuthenticated={props.onAuthenticated} /> : ""}

    </div>
  )
}

export default Home