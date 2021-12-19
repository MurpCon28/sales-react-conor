import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Grow } from '@mui/material';

const Index = () => {
  const [sales, setSales] = useState(null);

  let navigate = useNavigate()
  
  //This useState is used for a transition
  const [loaded, setLoaded] = useState(false);

  // const [page, setPage] = useState(0);
  // const [rowsPerPage, setRowsPerPage] = useState(10);
  
  // const handleChangePage = (event, newPage) => {
  //   setPage(newPage);
  // };
  
  // const handleChangeRowsPerPage = (event) => {
  //   setRowsPerPage(+event.target.value);
  //   setPage(0);
  // };

  useEffect(() => {
    //A get request is sent to the sales db to retrieve all sales data when the page is loaded
    axios
      .get("http://localhost:8001/sales")
      .then((response) => {
        console.log(response.data);
        setSales(response.data.sales);
        //The setLoaded is called when the page is is opened
        setLoaded((prev) => !prev);
      })
      .catch((error) => {
        console.log(`Error: ${error}`);
      });
  }, []);

  //used for onClick, redircts to the create page
  const create = () => {
    navigate('create')
  }

  //If there is no sales doesnt return anything
  if (!sales) return null;

  //A salesList is created that loops through all the sales from the DB
  const salesList = sales.map((sale) => {
    
    const view = () => {
    navigate(`/sales/${sale._id}`)

  }
    return (
      <div key={sale._id}>
        <p><b>Sale Date:</b> <Link to={`/sales/${sale._id}`}>{sale.saleDate}</Link></p>
        <p><b>Store Location:</b> {sale.storeLocation}</p>
        <p><b>Purchase Method:</b> {sale.purchaseMethod}</p>
        <Button onClick={view} variant="outlined">View</Button>
        <hr />
      </div>
    );
  });

  // const rows = [
  //   {salesList},
  // ];

  // const columns = [
  //   { id: 'saleDate', label: 'Date', minWidth: 170 },
  //   { id: 'storeLocation', label: 'Store Location', minWidth: 100 },
  //   { id: 'purchaseMethod', label: 'Purchase Method', minWidth: 100 },
  // ];

  return (
    <div>
      <Container maxWidth="fixed">
        <h2> Sales </h2>
        <p>This is the sales index page</p>
        <Button onClick={create} variant="outlined">Create</Button>
        {/* Grow is a transistion, when the page is loaded the sale table will grow and display the sale data */}
        <Grow
          in={loaded}
          style={{ transformOrigin: '0 0 0' }}
          {...(loaded ? { timeout: 1000 } : {})}
        >
          <Paper sx={{ width: '100%', overflow: 'hidden' }}
            style={{
              backgroundColor: '#e7f6fa'
            }}
          >
            <TableContainer sx={{ maxHeight: 440 }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead 
                style={{
                    backgroundColor: '#abd1e6'
                  }}>
                  <TableRow>
                   <TableCell>Sale Info</TableCell>
                    {/*<TableCell align="right">Store Location</TableCell>*/}
                   {/* <TableCell >Actions</TableCell>  */}
                    {/* {columns.map((column) => ( */}
                      {/* <TableCell
                          // key={column.id}
                          // align={column.align}
                          // style={{ minWidth: column.minWidth }}
                        >
                          {/* {salesList} */}
                      {/* </TableCell> 
                    ))} */}
                  </TableRow>
              </TableHead>
              <TableBody>
                {/* Tried to create a show more rows, due to backend only the first 20 from the DB will show */}
                {/* {rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                        {columns.map((column) => {
                          const value = row[column.id];
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {column.format && typeof value === 'number'
                                ? column.format(value)
                                : value}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })} */}

                  {/* {salesList} */}

                  <TableCell>{salesList}</TableCell>
                </TableBody>
              </Table>
            </TableContainer>
            {/* <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            /> */}
          </Paper>
        </Grow>

        {/* <h2> Sales </h2>
        <p>This is the sales index page</p>
        <Button onClick={create} variant="outlined">Create</Button>
        {salesList} */}
      </Container>
    </div>
  );
};

export default Index;
