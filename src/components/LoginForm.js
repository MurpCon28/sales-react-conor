import { useState } from 'react'
import axios from "axios";
import { TextField, Button, CardHeader, Card, Container } from '@mui/material'
import { useNavigate } from "react-router-dom";

const LoginForm = (props) => {

  const[form, setForm] = useState({email: "Testemail@email.com", password: "password"})

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
  
      axios.post('http://localhost:8001/users/login', {
        email: form.email,
        password: form.password
      })
            .then(response => {
              console.log(response.data.auth_token)
              props.onAuthenticated(true, response.data.auth_token)
              // setLoaded((prev) => !prev);
              navigate('/')
            })
            .catch(err => console.log(err))
    }

    return (
      <>
        {/* <Slide direction="up" in={loaded} mountOnEnter unmountOnExit> */}
          <Card sx={{ maxWidth: 250 }}>
            <Container maxWidth="sm">
              <CardHeader title="Login"/>
                <div className="form-group">
                  <TextField label="Email" type="email" variant="outlined" name="email" onChange={handleForm} />
                </div>
                <div className="form-group">
                  <TextField label="Password" type="password" variant="outlined" name="password" onChange={handleForm} />
                </div>
                <Button onClick={submitForm} variant="contained">Login</Button>
            </Container>
          </Card>
        {/* </Slide> */}
      </>
    )
  }

  export default LoginForm