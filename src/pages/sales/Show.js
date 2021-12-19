import { useParams, useNavigate } from 'react-router-dom'
// import axios from "../../config";
import axios from "axios";
import { useEffect, useState } from "react";
// import { Link } from 'react-router-dom';
import { Typography, Collapse, IconButton, CardActions, CardContent, CardMedia, CardHeader, Card, Container, Grid, Button, Slide } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import { styled } from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const Show = () => {

    let {_id} = useParams()
    let navigate = useNavigate()
    const [sale, setSale] = useState(null)

    let token = localStorage.getItem("auth_token")

    //expandMore is used within a card, when its clicked a transistion is made and the card displays more info of sales
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

      //expanded is created for a usestate
      const [expanded, setExpanded] = useState(false);
    
      const handleExpandClick = () => {
        setExpanded(!expanded);
      };

      const [loaded, setLoaded] = useState(false);

    useEffect(() => {
      //When the page loads a get request is sent to sales DB to get a sale by the _id of the one the user clicked to view
        axios
          .get(`https://sales-api-app.herokuapp.com/sales/${_id}`, {
              // headers: {
              //     "Authorization": `Bearer ${token}`
              // }
          })
          .then((response) => {
            console.log(response.data);
            setSale(response.data.sale);
            setLoaded((prev) => !prev);
          })
          .catch((err) => {
            console.log(`Error: ${err}`);
          });
      // }, [_id, token])
       }, [_id])

      if (!sale) return null;

      //Item is a loop that gets all the items info
      const Item = (props) => {
        //tagList is looped to get all the tags for one item in the array
       const tagList = props.item.tags.map(tag => (
          <p><b>Tags: </b>{tag}</p>
        ))

        return (
          <>
          <Container maxWidth="sm">
            {/* Tried adding grid layout to all the items */}
            <Grid container spacing={3}>
              <Grid xs={4}>
                <p><b>Item: </b>{props.item.name}</p>
                {tagList}
                <p><b>Price: </b>€{props.item.price.$numberDecimal}</p>
                <p><b>Quantity: </b>{props.item.quantity}</p>
                <br/>
              </Grid>
            </Grid>
          </Container>
          </>
        )

      }

      //itemsList loops all the sale items, gets the above code from item and places it within the itemList
      const itemsList = sale.items.map(item => (
        <Item key={item.name} item={item} />
      ))

      const edit = () => {
        navigate('edit')
      }

      //When the delete button is clicked a delete request is sent to the sales DB and the user is redircted to the sales idex page
      const onDelete = () => {
        axios
          .delete(`https://sales-api-app.herokuapp.com/sales/delete/${_id}`, {
              headers: {
                  "Authorization": `Bearer ${token}`
              }
          })
          .then((response) => {
            console.log(response.data);
            navigate(`/sales`)
          })
          .catch((err) => {
            console.log(`Error: ${err}`);
          });
      }
  
    return (
      <div>
        {/* The sale info is contained inside a card, which has an expand for more */}
        <Container maxWidth="sm">
          {/* The slide transistion is used when the page is loaded the card slides onto the page */}
          <Slide direction="up" in={loaded} mountOnEnter unmountOnExit>
            <Card sx={{ maxWidth: 635 }}
              style={{
                backgroundColor: '#e7f6fa'
              }}>
              <Container maxWidth="sm">
                <CardHeader title="Sale & Customer Info"/>
                  <Button onClick={edit} variant="contained">Edit</Button>
                  <Button onClick={() => onDelete(sale._id)} variant="contained" color="error" startIcon={<DeleteIcon />}>Delete</Button>
                  {/* The grid is used to space the info out in the card */}
                <Grid container spacing={2}>
                  <Grid xs={6}>
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
                  </Grid>
                <Grid xs={6}>
                  <CardContent>
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
                </Grid>
              </Grid>
              {/* When the view more is clicked, the card expands to show the items array info */}
                <CardActions disableSpacing>
                  <Typography paragraph>
                    <b>View Items Info</b>
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
                      <Typography paragraph>
                        <b>Item Info:</b>
                      </Typography>
                        <Typography paragraph>
                          {itemsList}
                        </Typography>
                    </CardContent>
                  </Collapse>
                </Container>
            </Card>
          </Slide>
        </Container>
        {/* <h2>This is the sale show page {_id} </h2> */}
      </div>
    )
  }
  
  export default Show