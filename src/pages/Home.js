import LoginForm from "../components/LoginForm"

const Home = props => {

  return (
    <div>
      <h2>Home</h2>

      <p>This is a site for sales, that contain the date of sale, store location, items purchased and other details, and details of the customer and their satifaction</p>

      {!props.authenticated ? <LoginForm onAuthenticated={props.onAuthenticated} /> : ""}

    </div>
  )
}

export default Home