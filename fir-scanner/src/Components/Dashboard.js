import React, { useEffect } from "react";
import axios from "axios";
import {
  Container,
  Grid,
} from "@material-ui/core";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableContainer,
  TableRow,
  TablePagination,
  TableFooter,
} from "@material-ui/core";

export default function Dashboard(props) {
  const [data, setData] = React.useState(null);
  const [dirtyList, setDirtyList] = React.useState(null);
  const [progressList, setProgressList] = React.useState(null);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const userRef = React.useRef(null);

  const getData = () => {
    axios.get(`http://localhost:8000/users/`).then((res) => {
      setData(res.data);
      setDirtyList(res.data.map((item) => false));
      setProgressList(res.data.map((item) => false));
    });
  };

  useEffect(() => {
    getData();
  }, [data]);

  const getTableHead = () => {
    return (
      <TableHead>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell>Age</TableCell>
          <TableCell>Address</TableCell>
          <TableCell>Gender</TableCell>
          <TableCell>Email</TableCell>
        </TableRow>
      </TableHead>
    );
  };

  const getTableBody = () => {
    return (
      <TableBody>
        {data.map((item, index) => (
          <TableRow key={item.id} hover>
            <TableCell>{item.name}</TableCell>
            <TableCell>{item.age}</TableCell>
            <TableCell>{item.address}</TableCell>
            <TableCell>{item.gender}</TableCell>
            <TableCell>{item.email}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    );
  };

  const showPlaceHolder = () => {
    return (
      <TableBody>
        <TableRow>
          <TableCell>
            Data was not recieved, there's something wrong with server
          </TableCell>
        </TableRow>
      </TableBody>
    );
  };

  const getPagination = () => {
    return (
      <TablePagination
        count={5}
        page={page}
        onChangePage={(event, page) => setPage(page)}
        rowsPerPage={rowsPerPage}
        onChangeRowsPerPage={(event) => {setRowsPerPage(event.target.value); setPage(0)}}
        rowsPerPageOptions={[5, 10, 15]}
      ></TablePagination>
    );
  };

  return (
    <Container>
        <Grid container justify="center">
          <Grid item>
            <TableContainer>
              <Table>
                {getTableHead()}
                {!!data && getTableBody()}
                {!data && showPlaceHolder()}
                <TableFooter>
                  <TableRow>{!!data && getPagination()}</TableRow>
                </TableFooter>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
    </Container>
  );
}
