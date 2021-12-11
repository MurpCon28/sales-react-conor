import { useParams } from 'react-router-dom'
// import axios from "../../config";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { Typography, Collapse, IconButton, CardActions, CardContent, CardMedia, CardHeader, Card } from '@mui/material'
import { styled } from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const Show = () => {

    let {_id} = useParams()
    const [sale, setSale] = useState(null)

    // let token = localStorage.getItem("token")

    const ExpandMore = styled((props) => {
      const { expand, ...other } = props;
      return <IconButton {...other} />;
    })(({ theme, expand }) => ({
      transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    }));

      const [expanded, setExpanded] = useState(false);
    
      const handleExpandClick = () => {
        setExpanded(!expanded);
      };

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
        <Card sx={{ maxWidth: 545 }}>
          <CardHeader
            title="Sale Info"
          />
        <CardContent>
          <Typography paragraph>
            <b>Sale Date:</b> {sale.saleDate}
          </Typography>
          <Typography paragraph>
            <b>Store Location:</b> {sale.storeLocation}
          </Typography>
          {/* <Typography paragraph>
            <b>Coupon Used:</b> {sale.couponUsed}
          </Typography> */}
          <Typography paragraph>
            <b>Purchase Method:</b> {sale.purchaseMethod}
          </Typography>
        </CardContent>
          <CardActions disableSpacing>
            <Typography paragraph>
              <b>View More Info</b>
            </Typography>
            <ExpandMore
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </ExpandMore>
          </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <CardContent>
                <Typography paragraph>Customer Info:</Typography>
                <Typography paragraph>
                  <b>Customer Email:</b> {sale.customer.email}
                </Typography>
                <Typography paragraph>
                  <b>Customer Gender:</b> {sale.customer.gender}
                </Typography>
                <Typography paragraph>
                  <b>Customer Age:</b> {sale.customer.age}
                </Typography>
                <Typography>
                  <b>Customer Satisfaction:</b> {sale.customer.satisfaction}
                </Typography>
              </CardContent>
            </Collapse>
        </Card>
        <h2>This is the sale show page {_id} </h2>
        <Link to="edit">Edit</Link>
        {itemsList}
      </div>
    )
  }
  
  export default Show