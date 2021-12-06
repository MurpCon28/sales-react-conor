import { Link,useNavigate } from "react-router-dom";

const Navbar = props => {

  let navigate = useNavigate()
  let logoutButton;

  const logout = () => {
    props.onAuthenticated(false)
    navigate('/', { replace: true})
  }

  if (props.authenticated) {
    logoutButton = <button onClick={logout}>Logout</button>
  }

  return (
    <div>
      <Link to="/">Home</Link> |
      <Link to="sales"> Sales</Link>
      {logoutButton}
    </div>
  );
};

export default Navbar;
