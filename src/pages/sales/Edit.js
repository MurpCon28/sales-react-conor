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
          // items: {
          //       name: sale.items.name,
          //       tags: sale.items.tags,
          //       price: {
          //           $numberDecimal: sale.items.price.$numberDecimal
          //       },
          //       quantity: sale.items.quantity
          //   },
          // itemName: sale.items.name,
          // itemTags: sale.items.tags,
          // itemPrice: sale.items.price.$numberDecimal,
          // itemQuantity: sale.items.quantity,
        //   customer: {
        //     gender: sale.customer.gender,
        //     age: sale.customer.age,
        //     email: sale.customer.email,
        //     satisfaction: sale.customer.satisfaction
        // },
          // customer: sale.customer.email,
          // customer: sale.customer.gender,
          // customer: sale.customer.age,
          // customer: sale.customer.satisfaction,
          // couponUsed: sale.couponUsed,
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

      let token = localStorage.getItem("auth_token")
  
      axios.put(`http://localhost:8001/sales/${_id}`, form, {
        headers: {
          "Authorization": `Bearer ${token}`
      }
      })
            .then(response => {
              console.log(response.data)
              navigate(`/sales/${_id}`)
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

        {/* {
          form.form.sale.items.name ? (
            <div className="form-group">
              <TextField label="Item Name" variant="filled" name="name" onChange={handleForm} value={form.sale.items.name} />
            </div>
          ) : (<Loading />)
        } */}

        {/* {
          form.sale.items.tags ? (
            <div className="form-group">
              <FormControl variant="filled" fullWidth>
                <FormLabel component="legend">Tags</FormLabel>
                  <FormGroup>
                    <FormControlLabel control={<Checkbox checked={electronics} onChange={handleForm} name="electronics" />} label="Electronics" value={form.sale.items.tags} />
                    <FormControlLabel control={ <Checkbox checked={school} onChange={handleForm} name="school" /> } label="School" value={form.sale.items.tags} />
                    <FormControlLabel control={ <Checkbox checked={office} onChange={handleForm} name="office" /> } label="Office" value={form.sale.items.tags} />
                    <FormControlLabel control={ <Checkbox checked={stationary} onChange={handleForm} name="stationary" /> } label="Stationary" value={form.sale.items.tags} />
                    <FormControlLabel control={ <Checkbox checked={general} onChange={handleForm} name="general" /> } label="General" value={form.sale.items.tags} />
                    <FormControlLabel control={ <Checkbox checked={organization} onChange={handleForm} name="organization" /> } label="Organization" value={form.sale.items.tags} />
                    <FormControlLabel control={ <Checkbox checked={writing} onChange={handleForm} name="writing" /> } label="Writing" value={form.sale.items.tags} />
                    <FormControlLabel control={ <Checkbox checked={travel} onChange={handleForm} name="travel" /> } label="Travel" value={form.sale.items.tags} />
                    <FormControlLabel control={ <Checkbox checked={kids} onChange={handleForm} name="kids" /> } label="Kids" value={form.sale.items.tags} />
                  </FormGroup>
                </FormControl>
            </div>
          ) : (<Loading />)
        } */}

        {/* {
          form.sale.items.quantity ? (
            <div className="form-group">
              <TextField label="Price" variant="filled" name="$numberDecimal" onChange={handleForm} value={form.sale.items.quantity} />
            </div>
          ) : (<Loading />)
        } */}

        {/* {
          form.sale.items.price.$numberDecimal ? (
            <div className="form-group">
              <TextField label="Quantity" variant="filled" name="quantity" onChange={handleForm} value={form.sale.items.price.$numberDecimal} />
            </div>
          ) : (<Loading />)
        } */}

        {/* {
          form.sale.customer.gender ? (
            <div className="form-group">
              <FormControl variant="filled" fullWidth>
                <InputLabel id="gender-select-label">Customer Gender</InputLabel>
                  <Select labelId="gender-select-label" onChange={handleForm} label="gender" name="gender" value={form.sale.customer.gender} >
                    <MenuItem value="M">Male</MenuItem>
                    <MenuItem value="F">Female</MenuItem>
                    <MenuItem value="O">Other</MenuItem>
                  </Select>
              </FormControl>
            </div>
          ) : (<Loading />)
        } */}

        {/* {
          form.sale.customer.age ? (
            <div className="form-group">
              <TextField label="Customer Age" variant="filled" name="age" onChange={handleForm} value={form.sale.customer.age} />
            </div>
          ) : (<Loading />)
        } */}

        {/* {
          form.sale.customer.email ? (
            <div className="form-group">
              <TextField label="Customer Email" variant="filled" name="email" onChange={handleForm} value={form.sale.customer.email} />
            </div>
            ) : (<Loading />)
        } */}

        {/* {
          form.sale.customer.satisfaction ? (
            <div className="form-group">
              <FormControl variant="filled" fullWidth>
                <InputLabel id="satisfaction-select-label">Customer Satisfaction (1-5)</InputLabel>
                  <Select labelId="satisfaction-select-label" onChange={handleForm} label="Satisfaction" name="satisfaction" value={form.sale.customer.satisfaction} >
                    <MenuItem value="1">1</MenuItem>
                    <MenuItem value="2">2</MenuItem>
                    <MenuItem value="3">3</MenuItem>
                    <MenuItem value="4">4</MenuItem>
                    <MenuItem value="5">5</MenuItem>
                  </Select>
              </FormControl>
            </div>
          ) : (<Loading />)
        } */}

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