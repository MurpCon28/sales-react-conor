import { useState } from 'react'
import axios from "axios";
import { TextField, Button, CardHeader, Card, Container } from '@mui/material'
import { useNavigate } from "react-router-dom";

const LoginForm = (props) => {

  //This conts useState is used for a quick login, meaning the email and password fields are already filled out
  // const[form, setForm] = useState({email: "Testemail@email.com", password: "password"})
  const[form, setForm] = useState({})

  let navigate = useNavigate()

  // const [loaded, setLoaded] = useState(false);

    const handleForm = e => {

      setForm(prevState => ({
        ...prevState,
        [e.target.name] : e.target.value
      }))
  
      console.log(form)
    }
  
    const submitForm = () => {
      console.log(form)
  
      //When the submit button is clicked the email and password fields that are filled are used as part of the post request for users login of the sales DB
      axios.post('https://sales-api-app.herokuapp.com/users/login', {
        email: form.email,
        password: form.password
      })
            .then(response => {
              console.log(response.data.auth_token)
              //A new auth_token is given to the user
              props.onAuthenticated(true, response.data.auth_token)
              // setLoaded((prev) => !prev);
              //Then the navigate is used to redirct the user to the home page
              navigate('/')
            })
            //If there is an error it, the error will be caught and displayed in the console
            .catch(err => console.log(err))
    }

    return (
      <>
        {/* <Slide direction="up" in={loaded} mountOnEnter unmountOnExit> */}
        {/* The sale form is contained in a card and container div */}
          <Card sx={{ maxWidth: 250 }}
            style={{
              backgroundColor: '#e7f6fa'
            }}>
            <Container maxWidth="sm">
              <CardHeader title="Login"/>
                <div className="form-group">
                  <TextField label="Email" type="email" variant="outlined" name="email" onChange={handleForm} />
                </div>
                <div className="form-group">
                  <TextField label="Password" type="password" variant="outlined" name="password" onChange={handleForm} />
                </div>
                <Button onClick={submitForm} style={{float: 'right'}} variant="contained">Login</Button>
            </Container>
          </Card>
        {/* </Slide> */}
      </>
    )
  }

  export default LoginForm