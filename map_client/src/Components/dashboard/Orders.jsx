import * as React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Title from "./Title";

export default function Orders({ tableData }) {
  // const [tableData, setTableData] = React.useState([]);

  // React.useEffect(() => {
  //   fetch("http://localhost:8000/gdb/location")
  //     .then((res) => res.json())
  //     .then((res) => {
  //       setTableData(res.result);
  //       console.log(res);
  //     })
  //     .catch((err) => console.log(err));
  // }, []);

  return (
    <React.Fragment>
      <Title>Current Crime Reports for City</Title>
      {tableData.length > 0 && (
        <Table size="medium">
          <TableHead>
            <TableRow>
              {Object.keys(tableData[0]).map((header) => (
                <TableCell>{header}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.map((row, idx) => (
              <TableRow key={idx}>
                {Object.keys(row).map((val) => (
                  <TableCell>{row[val]}</TableCell>
                ))}
                {/* <TableCell>{row.location}</TableCell>
                <TableCell>{row.AttemptToMurder}</TableCell>
                <TableCell>{row.Burglary}</TableCell>
                <TableCell>{row.Cheating}</TableCell>
                <TableCell>{row.Dowry}</TableCell>
                <TableCell>{row.Hurt}</TableCell>
                <TableCell>{row.KidnappingAndAbduction}</TableCell>
                <TableCell>{row.Murder}</TableCell>
                <TableCell>{row.Rape}</TableCell>
                <TableCell>{row.Riots}</TableCell>
                <TableCell>{row.Theft}</TableCell>
                <TableCell>{row.total}</TableCell>
                <TableCell>{row.year}</TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </React.Fragment>
  );
}
