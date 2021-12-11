import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';

const Index = () => {
  const [sales, setSales] = useState(null);

  let navigate = useNavigate()

  useEffect(() => {
    axios
      .get("http://localhost:8001/sales")
      .then((response) => {
        console.log(response.data);
        setSales(response.data.sales);
      })
      .catch((error) => {
        console.log(`Error: ${error}`);
      });
  }, []);

  const create = () => {
    navigate('create')
  }

  if (!sales) return null;

  const salesList = sales.map((sale) => {
    return (
      <div key={sale._id}>
        <p><b>Sale Date:</b> <Link to={`/sales/${sale._id}`}>{sale.saleDate}</Link></p>
        <p><b>Store Location:</b> {sale.storeLocation}</p>
        <hr />
      </div>
    );
  });

  return (
    <div>
      <h2> Sales </h2>
      <p>This is the sales index page</p>
      <Button onClick={create} variant="contained">Create</Button>
      {salesList}
    </div>
  );
};

export default Index;
