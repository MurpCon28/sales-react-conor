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

      const Item = (props) => {
       const tagList = props.item.tags.map(tag => (
          <p><b>Tag: </b>{tag}</p>
        ))

        return (
          <>
            <p><b>Item: </b>{props.item.name}</p>
            {tagList}
            <p><b>Price: </b>{props.item.price.$numberDecimal}</p>
            <p><b>Quantity: </b>{props.item.quantity}</p>
            <br/>
          </>
        )

      }

      const itemsList = sale.items.map(item => (
        <Item key={item.name} item={item} />
      ))
  
    return (
      <div>
        <h2>This is the sale show page {_id} </h2>

        <p><b>Sale Date:</b> {sale.saleDate}</p>
        {itemsList}
        <p><b>Store Location:</b> {sale.storeLocation}</p>
        <p><b>Customer Email:</b> {sale.customer.email}</p>
        <p><b>Customer Gender:</b> {sale.customer.gender}</p>
        <p><b>Customer Age:</b> {sale.customer.age}</p>
        <p><b>Customer Satisfaction:</b> {sale.customer.satisfaction}</p>
        <p><b>Coupon Used:</b> {sale.couponUsed}</p>
        <p><b>Purchase Method:</b> {sale.purchaseMethod}</p>
        <Link to="edit">Edit</Link>
      </div>
    )
  }
  
  export default Show