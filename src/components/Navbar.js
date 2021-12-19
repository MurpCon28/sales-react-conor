import { useNavigate } from "react-router-dom";
import * as React from 'react';
// import { styled, alpha } from '@mui/material/styles';
// import AppBar from '@mui/material/AppBar';
import { AppBar, Toolbar, IconButton, Typography, Button } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
// import InputBase from '@mui/material/InputBase';
// import SearchIcon from '@mui/icons-material/Search';

const Navbar = props => {

  let navigate = useNavigate()
  let logoutButton;
  let loginButton;
  // let registerButton;

  const logout = () => {
    props.onAuthenticated(false)
    navigate('/', { replace: true})
  }

  //This is used for the button onClick, when the user clicks these buttons they are redircted
  const home = () => {
    navigate('/')
  }

  const sales = () => {
    navigate('/sales')
  }

  const login = () => {
    navigate('/login')
  }

  // const register = () => {
  //   navigate('/register')
  // }

  //If the user is logged in they can see the logout button, if they are not they can see a login button
  if (props.authenticated) {
    logoutButton = <Button onClick={logout} color="inherit">Logout</Button>
  } else {
    loginButton = <Button onClick={login} color="inherit">Login</Button>
    // registerButton = <Button onClick={register} color="inherit">Register</Button>
  }

  // const pages = ['Home', 'Sales'];

  return (
    <div>

      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Sales
            </Typography>
            <Button onClick={home} color="inherit">Home</Button>
            <Button onClick={sales} color="inherit">Sales</Button>
            {/* <Button onClick={login} color="inherit">Login</Button>
            <Button onClick={register} color="inherit">Register</Button> */}
            {/* <Link to="/">Home</Link> |
            <Link to="sales"> Sales</Link> */}
            {/* The below buttons will show depending on the authenication state */}
            {loginButton}
            {/* {registerButton} */}
            {logoutButton}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
