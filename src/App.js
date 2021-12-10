import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from 'react'
//Components
import Navbar from "./components/Navbar";

//PAGES
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SalesIndex from "./pages/sales/Index";
import SalesShow from "./pages/sales/Show";
import SalesCreate from "./pages/sales/Create";
import SalesEdit from "./pages/sales/Edit";
import PageNotFound from "./pages/PageNotFound";

const App = () => {
  const [authenticated, setAuthenticated] = useState(false)

  let protectedSales

  useEffect(() => {
    if(localStorage.getItem('auth_token')) {
      setAuthenticated(true)
    }
  }, []);

  const onAuthenticated = (auth, auth_token) => {
    setAuthenticated(auth)
    if (auth) {
      localStorage.setItem('auth_token', auth_token)
    } 
    else {
      localStorage.removeItem('auth_token')
    }
  }

    if(authenticated) {
      protectedSales = (
        <>
        <Route path="/sales/create" element={<SalesCreate />} />
        <Route path="/sales/:_id/edit" element={<SalesEdit />} />
        {/* <Route path="/sales/:_id" element={<SalesShow />} /> */}
        </>
        
      )
    }

  return (
    <Router>
      <Navbar onAuthenticated={onAuthenticated} authenticated={authenticated} />
      <Routes>
        <Route path="/" element={<Home onAuthenticated={onAuthenticated} authenticated={authenticated} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/sales" element={<SalesIndex />} />
        <Route path="/sales/:_id" element={<SalesShow />} />
        {protectedSales}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
