import { useState } from 'react'
import axios from "axios";
import TextField from '@mui/material/TextField'

const LoginForm = (props) => {

  const[form, setForm] = useState({email: "Testemail@email.com", password: "password"})

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
            })
            .catch(err => console.log(err))
    }

    let btnStyles = {
      backgroundColor: "yellow",
      dontWeight: "bold"
    }

    return (
      <>
      <TextField label="email" variant="outlined" name="email" onChange={handleForm} />
        <br/>
        Password: <input type="password" name="password" onChange={handleForm} />

        <button style={btnStyles} onClick={submitForm}>Submit</button>
      </>
    )
  }

  export default LoginForm