import { useState } from 'react'
import axios from "axios";
import TextField from '@mui/material/TextField'
import { useNavigate } from "react-router-dom";

const RegisterForm = (props) => {
// const RegisterForm = () => {

  const[form, setForm] = useState({ name: "2Testt Name", email: "2registerTestEmail@email.com", password: "password"})

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
              axios.post('http://localhost:8001/users/login', {
                email: form.email,
                password: form.password
              })
                .then(response => {
                  // console.log(response.data.auth_token)
                  props.onAuthenticated(true, response.data.auth_token)
                })
            navigate('/')
            })
            .catch(err => console.log(err))
    }

    let btnStyles = {
      backgroundColor: "yellow",
      dontWeight: "bold"
    }

    return (
      <>
      <div className="form-group">
        <TextField label="Email" type="email" variant="outlined" name="email" onChange={handleForm} />
      </div>
      <div className="form-group">
        <TextField label="Name" variant="outlined" name="name" onChange={handleForm} />
      </div>
      <div className="form-group">
        <TextField label="Password" type="password" variant="outlined" name="password" onChange={handleForm} />
      </div>

        <button style={btnStyles} onClick={submitForm}>Submit</button>
      </>
    )
  }

  export default RegisterForm