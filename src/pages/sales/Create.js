import { useState } from "react"
import axios from "axios"
import { TextField, MenuItem, FormControl, Select, InputLabel, Checkbox, FormControlLabel, FormLabel, FormGroup, Button } from '@mui/material'
import {useNavigate} from "react-router-dom";
// import { AdapterMoment, LocalizationProvider, DateTimePicker} from '@mui/lab'

// const Item = () => {

//   return (
//     <>
//     This sgould be a form 
//     </>
//   )
// }

const Create = () => {

  const[form, setForm] = useState({})
  // const[items, setItems] = useState([])

  let navigate = useNavigate()

    const [state, setState] = useState({
      electronics: false,
      school: false,
      office: false,
      stationary: false,
      general: false,
      organization: false,
      writing: false,
      travel: false,
      kids: false,
    });

    // price["$numberDecimal"]

    const { electronics, school, office, stationary, general, organization, writing, travel, kids } = state;

    const handleForm = e => {

      setForm(prevState => ({
        ...prevState,
        [e.target.name] : e.target.value
      }))

        setState({
        ...state,
        [e.target.name]: e.target.checked,
      })
  
      console.log(form)
    }

    const submitForm = () => {
      console.log(form)

      let token = localStorage.getItem("auth_token")
  
      axios.post('http://localhost:8001/sales/', form, {
        headers: {
          "Authorization": `Bearer ${token}`
      }
      })
            .then(response => {
              console.log(response.data)
              navigate(`/sales`)
            })
            .catch(err => console.log(err))
    }
  
    return (
      <div>
        <h2>Create</h2>

          <div className="form-group">
            <TextField
              id="datetime-local"
              label="Sale Date"
              type="datetime-local"
              variant="filled"
              name="saleDate"
              onChange={handleForm}
              // defaultValue="2017-05-24T10:30"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>

          <div className="form-group">
            <FormControl variant="filled" fullWidth>
            <InputLabel id="store-location-select-label">Store Location</InputLabel>
            <Select labelId="store-location-select-label" onChange={handleForm} label="Store Location" name="storeLocation">
            <MenuItem value="Dublin">Dublin</MenuItem>
              <MenuItem value="Cork">Cork</MenuItem>
              <MenuItem value="Galway">Galway</MenuItem>
              <MenuItem value="Mayo">Mayo</MenuItem>
              <MenuItem value="Wexford">Wexford</MenuItem>
              <MenuItem value="New York">New York</MenuItem>
              <MenuItem value="San Diego">San Diego</MenuItem>
              <MenuItem value="London">London</MenuItem>
              <MenuItem value="Liverpool">Liverpool</MenuItem>
              <MenuItem value="Manchester">Manchester</MenuItem>
              <MenuItem value="Berlin">Berlin</MenuItem>
              <MenuItem value="Munich">Munich</MenuItem>
              <MenuItem value="Paris">Paris</MenuItem>
            </Select>
            </FormControl>
          </div>

          <div className="form-group">
            <TextField label="Item Name" variant="filled" name="name" onChange={handleForm} />
          </div>

          <div className="form-group">
            <FormControl variant="filled" fullWidth>
              <FormLabel component="legend">Tags</FormLabel>
                <FormGroup>
                  <FormControlLabel control={<Checkbox checked={electronics} onChange={handleForm} name="electronics" />} label="Electronics" />
                  <FormControlLabel control={ <Checkbox checked={school} onChange={handleForm} name="school" /> } label="School" />
                  <FormControlLabel control={ <Checkbox checked={office} onChange={handleForm} name="office" /> } label="Office" />
                  <FormControlLabel control={ <Checkbox checked={stationary} onChange={handleForm} name="stationary" /> } label="Stationary" />
                  <FormControlLabel control={ <Checkbox checked={general} onChange={handleForm} name="general" /> } label="General" />
                  <FormControlLabel control={ <Checkbox checked={organization} onChange={handleForm} name="organization" /> } label="Organization" />
                  <FormControlLabel control={ <Checkbox checked={writing} onChange={handleForm} name="writing" /> } label="Writing" />
                  <FormControlLabel control={ <Checkbox checked={travel} onChange={handleForm} name="travel" /> } label="Travel" />
                  <FormControlLabel control={ <Checkbox checked={kids} onChange={handleForm} name="kids" /> } label="Kids" />
                </FormGroup>
              </FormControl>
          </div>

          {/* <div className="form-group">
            <TextField label="Price" variant="filled" name="$numberDecimal" onChange={handleForm} />
          </div> */}

          <div className="form-group">
            <TextField label="Quantity" variant="filled" name="quantity" onChange={handleForm} />
          </div>

          <div className="form-group">
            <FormControl variant="filled" fullWidth>
              <InputLabel id="gender-select-label">Customer Gender</InputLabel>
                <Select labelId="gender-select-label" onChange={handleForm} label="gender" name="gender" >
                  <MenuItem value="M">Male</MenuItem>
                  <MenuItem value="F">Female</MenuItem>
                  <MenuItem value="O">Other</MenuItem>
                </Select>
            </FormControl>
          </div>

          <div className="form-group">
            <TextField label="Customer Age" variant="filled" name="age" onChange={handleForm} />
          </div>

          <div className="form-group">
            <TextField label="Customer Email" variant="filled" name="email" onChange={handleForm} />
          </div>

          <div className="form-group">
            <FormControl variant="filled" fullWidth>
              <InputLabel id="satisfaction-select-label">Customer Satisfaction (1-5)</InputLabel>
                <Select labelId="satisfaction-select-label" onChange={handleForm} label="Satisfaction" name="satisfaction" >
                  <MenuItem value="1">1</MenuItem>
                  <MenuItem value="2">2</MenuItem>
                  <MenuItem value="3">3</MenuItem>
                  <MenuItem value="4">4</MenuItem>
                  <MenuItem value="5">5</MenuItem>
                </Select>
            </FormControl>
          </div>

          <div className="form-group">
            <FormControl variant="filled" fullWidth>
              <InputLabel id="purchase-select-label">Purchase Method</InputLabel>
                <Select labelId="purchase-select-label" onChange={handleForm} label="Purchase Method" name="purchaseMethod" >
                  <MenuItem value="In store">In Store</MenuItem>
                  <MenuItem value="Online">Online</MenuItem>
                </Select>
            </FormControl>
          </div>

      <Button onClick={submitForm} variant="contained">Submit</Button>
    </div>
  )
}
  
 export default Create