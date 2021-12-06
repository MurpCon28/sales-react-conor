import { useParams } from 'react-router-dom'
// import axios from "../../config";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';

const Show = () => {

    let {_id} = useParams()
    const [sale, setSale] = useState(null)

    // let token = localStorage.getItem("token")

    useEffect(() => {
        axios
          .get(`http://localhost:8001/sales/${_id}`, {
              // headers: {
              //     "Authorization": `Bearer ${token}`
              // }
          })
          .then((response) => {
            console.log(response.data);
            setSale(response.data.sale);
          })
          .catch((err) => {
            console.log(`Error: ${err}`);
          });
      // }, [_id, token])
       }, [_id])

      if (!sale) return null;
  
    return (
      <div>
        <h2>This is the sale show page {_id} </h2>

        <p><b>Sale Date:</b> {sale.saleDate}</p>
        <p><b>Items:</b> {sale.items.name}</p>
        <p><b>Store Location:</b> {sale.storeLocation}</p>
        <p><b>Customer:</b> {sale.customer.name}</p>
        <p><b>Purchase Method:</b> {sale.purchaseMethod}</p>
        <Link to="edit">Edit</Link>
      </div>
    )
  }
  
  export default Show