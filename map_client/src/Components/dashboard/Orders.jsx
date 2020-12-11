import * as React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Title from "./Title";
import { Link } from "@material-ui/core";

export default function Orders({
  tableData,
  location,
  isMissionControl,
  setName,
  setCounter,
}) {
  return (
    <React.Fragment>
      {!!location && <Title>Current Crime Reports for {location}</Title>}
      {tableData && tableData.length > 0 && (
        <Table size="medium">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              {Object.keys(tableData[0]).map((header) => (
                <TableCell>{header}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.map((row, idx) => (
              <TableRow key={idx}>
                <TableCell>{idx + 1}</TableCell>
                {Object.keys(row).map((val) => (
                  <TableCell>
                    {isMissionControl && val === "name" ? (
                      <Link
                        onClick={() => {
                          setName(row[val]);
                          setCounter(1);
                        }}
                      >
                        {row[val]}
                      </Link>
                    ) : (
                      row[val]
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </React.Fragment>
  );
}
