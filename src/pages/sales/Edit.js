import { useState, useEffect } from "react"
import axios from "axios"
import { TextField, MenuItem, FormControl, Select, InputLabel, Button } from '@mui/material'
import { useNavigate, useParams } from "react-router-dom";
// import { AdapterMoment, LocalizationProvider, DateTimePicker} from '@mui/lab'
import moment from 'moment'

const Edit = () => {

  const[form, setForm] = useState({})
  const [sale, setSales] = useState({})

  let {_id} = useParams()
  let navigate = useNavigate()

    let token = localStorage.getItem("token")

    useEffect(() => {
        axios
          .get(`http://localhost:8001/sales/${_id}`, {
              headers: {
                  "Authorization": `Bearer ${token}`
              }
          })
          .then((response) => {
            console.log(response.data);
            setSales(response.data.sale);
          })
          .catch((err) => {
            console.log(`Error: ${err}`);
          });
      }, [_id, token])

      useEffect(()=> {
        setForm({
          saleDate: moment(sale.saleDate).format("yyyy-MM-DDThh:mm"),
          storeLocation: sale.storeLocation,
          purchaseMethod: sale.purchaseMethod
        })
      }, [sale])

      if (!sale) return null;

    const handleForm = e => {

      setForm(prevState => ({
        ...prevState,
        [e.target.name] : e.target.value
      }))
  
      console.log(form)
    }

    const submitForm = () => {
      console.log(form)

      let token = localStorage.getItem("token")
  
      axios.put(`http://localhost:8001/sales/${_id}`, form, {
        headers: {
          "Authorization": `Bearer ${token}`
      }
      })
            .then(response => {
              console.log(response.data.token)
              navigate(`/sales/${response.data_id}`)
            })
            .catch(err => console.log(err))
    }

    const Loading = () => {
      return <div className="form-group">Loading...</div>
    }
  
    return (
      <div>
        <h2>Edit</h2>

        {
          form.saleDate ? (
            <div className="form-group">
              <TextField
                id="datetime-local"
                label="Sale Date"
                type="datetime-local"
                variant="filled"
                name="saleDate"
                onChange={handleForm}
                value={form.saleDate}
                // defaultValue="2017-05-24T10:30"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>
          ) : (<Loading />)
        }

        {
          form.storeLocation ? (
            <div className="form-group">
              <FormControl variant="filled" fullWidth>
              <InputLabel id="store-location-select-label">Store Location</InputLabel>
              <Select labelId="store-location-select-label" onChange={handleForm} label="Store Location" name="storeLocation" value={form.storeLocation} >
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
          ) : (<Loading />)
        }

        {
          form.purchaseMethod ? (
            <div className="form-group">
              <FormControl variant="filled" fullWidth>
              <InputLabel id="store-location-select-label">Store Location</InputLabel>
              <Select labelId="purchase-select-label" onChange={handleForm} label="Purchase Method" name="purchaseMethod" value={form.purchaseMethod} >
                <MenuItem value="In store">In Store</MenuItem>
                <MenuItem value="Online">Online</MenuItem>
              </Select>
              </FormControl>
            </div>
          ) : (<Loading />)
        }

        <Button onClick={submitForm} variant="contained">Submit</Button>
      </div>
    )
  }
  
  export default Edit