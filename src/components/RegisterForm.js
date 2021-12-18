import { useState } from 'react'
import axios from "axios";
import { TextField, Button, CardHeader, Card, Container} from '@mui/material'
import { useNavigate } from "react-router-dom";

const RegisterForm = (props) => {
// const RegisterForm = () => {

  const[form, setForm] = useState({ name: "9Testt Name", email: "9registerTestEmail@email.com", password: "password"})

  let navigate = useNavigate()

    const handleForm = e => {

      setForm(prevState => ({
        ...prevState,
        [e.target.name] : e.target.value
      }))
  
      console.log(form)
    }
  
    const submitForm = () => {
      console.log(form)
  
      axios.post('http://localhost:8001/users/register', {
        name: form.name,
        email: form.email,
        password: form.password
      })
        .then(response => {
          console.log(response.data.auth_token)
          // props.onAuthenticated(true, response.data.auth_token)
            })
        .catch(err => console.log(err))
      axios.post('http://localhost:8001/users/login', {
        email: form.email,
        password: form.password
      })
        .then(response => {
          // console.log(response.data.auth_token)
          props.onAuthenticated(true, response.data.auth_token)
          navigate('/')
        })
    }

    return (
      <>
      <Card sx={{ maxWidth: 250 }}
        style={{
          backgroundColor: '#e7f6fa'
        }}>
          <Container maxWidth="sm">
            <CardHeader title="Register"/>
            <div className="form-group">
              <TextField label="Email" type="email" variant="outlined" name="email" onChange={handleForm} />
            </div>
            <div className="form-group">
              <TextField label="Name" variant="outlined" name="name" onChange={handleForm} />
            </div>
            <div className="form-group">
              <TextField label="Password" type="password" variant="outlined" name="password" onChange={handleForm} />
            </div>
            <Button onClick={submitForm} variant="contained">Register</Button>
          </Container>
        </Card>
      </>
    )
  }

  export default RegisterForm