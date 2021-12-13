import LoginForm from "../components/LoginForm"
import RegisterForm from "../components/RegisterForm"
import { Container } from '@mui/material'

const Home = props => {

  return (
    <Container maxWidth="sm">
      <div>
        <h2>Home</h2>

        <p>This is a site for sales, that contain the date of sale, store location, items purchased and other details, and details of the customer and their satifaction</p>

        {!props.authenticated ? <LoginForm onAuthenticated={props.onAuthenticated} /> : ""}
        {!props.authenticated ? <RegisterForm onAuthenticated={props.onAuthenticated} /> : ""}
        
      </div>
    </Container>
  )
}

export default Home