import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Index = () => {
  const [sales, setSales] = useState(null);

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
      <Link to="create"> Create</Link>
      {salesList}
    </div>
  );
};

export default Index;
