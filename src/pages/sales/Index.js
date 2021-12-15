import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material';

const Index = () => {
  const [sales, setSales] = useState(null);

  let navigate = useNavigate()

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

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
        <p><b>Purchase Method:</b> {sale.purchaseMethod}</p>
        <hr />
      </div>
    );
  });

  const rows = [
    {salesList},
  ];

  const columns = [
    { id: 'saleDate', label: 'date', minWidth: 170 },
    { id: 'storeLocation', label: 'Store Location', minWidth: 100 },
    { id: 'purchaseMethod', label: 'Purchase Method', minWidth: 100 },
  ];

  return (
    <div>
      <Container maxWidth="fixed">
        <h2> Sales </h2>
        <p>This is the sales index page</p>
        <Button onClick={create} variant="outlined">Create</Button>
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: column.minWidth }}
                      >
                        {salesList}
                    </TableCell>
                  ))}
                </TableRow>
            </TableHead>
            <TableBody>
              {rows
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
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>

        <h2> Sales </h2>
        <p>This is the sales index page</p>
        <Button onClick={create} variant="outlined">Create</Button>
        {salesList}
      </Container>
    </div>
  );
};

export default Index;
