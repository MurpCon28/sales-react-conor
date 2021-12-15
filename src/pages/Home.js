import LoginForm from "../components/LoginForm"
import RegisterForm from "../components/RegisterForm"
import { Container, Grid } from '@mui/material'

const Home = props => {

  return (
    <Container maxWidth="sm">
      <div>
        <h2>Home</h2>

        <p>This is a site for sales, that contain the date of sale, store location, items purchased and other details, and details of the customer and their satifaction</p>
        <br/>
        <Grid container spacing={2}>
          <Grid xs={6}>
            {!props.authenticated ? <LoginForm onAuthenticated={props.onAuthenticated} /> : ""}
          </Grid>
          <Grid xs={6}>
            {!props.authenticated ? <RegisterForm onAuthenticated={props.onAuthenticated} /> : ""}
          </Grid>
        </Grid>
      </div>
    </Container>
  )
}

export default Home